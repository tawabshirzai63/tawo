const receptionist = require('../src/receptionist');

async function simulateConversation() {
    const from = '+19165550001';
    
    console.log('--- Simulating Conversation ---');
    
    const inputs = [
        "Hello, what services do you offer?",
        "I'm interested in paint correction for my Tesla.",
        "How much does that cost?",
        "I'd like to book an appointment for next Monday at 10 AM.",
        "Yes please, confirm the booking."
    ];

    for (const text of inputs) {
        console.log(`User: ${text}`);
        const response = await receptionist.handleInput(from, text);
        console.log(`AI: ${response}`);
        console.log('---------------------------');
    }
}

simulateConversation().catch(console.error);
