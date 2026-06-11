require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const receptionist = require('./receptionist');
const { VoiceResponse } = require('twilio').twiml;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Cali Performance Detailing AI Receptionist API');
});

/**
 * Twilio Voice Webhook
 */
app.post('/webhooks/voice', async (req, res) => {
    const twiml = new VoiceResponse();
    const from = req.body.From;
    const speechResult = req.body.SpeechResult;

    if (!speechResult) {
        // Initial greeting or no input
        twiml.say('Thanks for calling Cali Performance Detailing. How can I help you today?');
        twiml.gather({
            input: 'speech',
            action: '/webhooks/voice',
            timeout: 3
        });
    } else {
        // Handle AI response
        const aiResponse = await receptionist.handleInput(from, speechResult);
        twiml.say(aiResponse);
        twiml.gather({
            input: 'speech',
            action: '/webhooks/voice',
            timeout: 3
        });
    }

    res.type('text/xml');
    res.send(twiml.toString());
});

/**
 * Twilio SMS Webhook
 */
app.post('/webhooks/sms', async (req, res) => {
    const from = req.body.From;
    const body = req.body.Body;

    const aiResponse = await receptionist.handleInput(from, body);

    res.type('text/xml');
    res.send(\`<Response><Message>\${aiResponse}</Message></Response>\`);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(\`Server is running on port \${PORT}\`);
});
