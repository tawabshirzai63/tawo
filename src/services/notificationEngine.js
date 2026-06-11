const db = require('../db');
const twilio = require('./twilio');
const moment = require('moment');

class NotificationEngine {
    /**
     * Check for appointments that need reminders (24h and 2h before).
     */
    async checkReminders() {
        console.log('Checking for appointment reminders...');
        
        const now = moment();
        const next24h = moment().add(24, 'hours').format('YYYY-MM-DD HH:mm');
        const next2h = moment().add(2, 'hours').format('YYYY-MM-DD HH:mm');

        // This is a simplified query. In a real app, you'd track if reminder was already sent.
        db.all("SELECT a.*, l.phone FROM appointments a JOIN leads l ON a.lead_id = l.id WHERE a.status = 'Scheduled'", [], (err, rows) => {
            if (err) {
                console.error('Error fetching appointments for reminders:', err);
                return;
            }

            rows.forEach(async (app) => {
                const appTime = moment(`${app.appointment_date} ${app.appointment_time}`, 'YYYY-MM-DD HH:mm');
                const diffHours = Math.round(appTime.diff(now, 'hours', true));
                
                console.log(`Checking appointment ${app.id}: ${app.appointment_date} ${app.appointment_time}, diffHours=${diffHours}`);

                // 24 hour reminder
                if (diffHours === 24) {
                    await twilio.sendReminder(app.phone, { service: app.service_requested, time: app.appointment_time }, 24);
                }
                
                // 2 hour reminder
                if (diffHours === 2) {
                    await twilio.sendReminder(app.phone, { service: app.service_requested, time: app.appointment_time }, 2);
                }
            });
        });
    }

    /**
     * Trigger missed call recovery.
     * @param {string} from 
     */
    async handleMissedCall(from) {
        const body = "Hi! We missed your call at Cali Performance Detailing. You can book an appointment directly here: https://caliperformancedetailing.com/book or reply with the service you need!";
        await twilio.sendSms(from, body);
        
        // Log missed call
        db.run("INSERT INTO logs (sid, type, direction, content, notes) VALUES (?, ?, ?, ?, ?)",
            ['missed', 'call', 'inbound', 'Missed Call', `From ${from}`]);
    }
}

module.exports = new NotificationEngine();
