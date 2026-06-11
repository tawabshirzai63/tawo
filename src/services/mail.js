const fs = require('fs');
const path = require('path');
const db = require('../db');

/**
 * Mock Mail Service
 */
class MailService {
    constructor() {
        this.logsDir = '/home/team/shared/logs';
    }

    /**
     * Send an email (Mocked)
     * @param {string} to 
     * @param {string} subject 
     * @param {string} body 
     */
    async sendEmail(to, subject, body) {
        const emailData = {
            to,
            subject,
            body,
            timestamp: new Date().toISOString()
        };

        const filename = `email_${Date.now()}.json`;
        const filepath = path.join(this.logsDir, filename);

        // Save as JSON
        fs.writeFileSync(filepath, JSON.stringify(emailData, null, 2));

        // Log to DB
        db.run("INSERT INTO logs (type, direction, content, notes) VALUES (?, ?, ?, ?)",
            ['sms', 'outbound', body, `Email to ${to} (Mocked)`]);

        console.log('Mock Email "Sent":', filepath);
        return emailData;
    }

    async sendBookingConfirmation(to, appointment) {
        const subject = 'Booking Confirmation: Cali Performance Detailing';
        const body = `Hi ${to},\n\nYour appointment for ${appointment.service} on ${appointment.date} at ${appointment.time} is confirmed.\n\nSee you soon!`;
        return this.sendEmail(to, subject, body);
    }
}

module.exports = new MailService();
