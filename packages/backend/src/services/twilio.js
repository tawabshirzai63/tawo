/**
 * Twilio Service (Mocked for testing)
 */
class TwilioService {
    constructor() {
        this.sentMessages = []; // In-memory mock storage
    }

    /**
     * Send an SMS message.
     * @param {string} to - recipient phone number
     * @param {string} body - message body
     * @returns {Promise<object>}
     */
    async sendSms(to, body) {
        const message = {
            sid: `mock_sms_${Date.now()}` ,
            to,
            body,
            status: 'sent',
            timestamp: new Date().toISOString()
        };

        this.sentMessages.push(message);
        console.log('Mock Twilio SMS Sent:', message);
        return message;
    }

    /**
     * Send an appointment confirmation SMS.
     * @param {string} to - phone number
     * @param {object} appointment - { date, time, service }
     */
    async sendBookingConfirmation(to, appointment) {
        const body = `Hi, your Cali Performance Detailing appointment for ${appointment.service} on ${appointment.date} at ${appointment.time} is confirmed. We'll see you then!`;
        return this.sendSms(to, body);
    }

    /**
     * Send a reminder SMS.
     * @param {string} to - phone number
     * @param {string} hours - how many hours before the appointment
     */
    async sendReminder(to, appointment, hours) {
        const body = `Reminder: You have a Cali Performance Detailing appointment for ${appointment.service} in ${hours} hours (${appointment.time}).`;
        return this.sendSms(to, body);
    }
}

module.exports = new TwilioService();
