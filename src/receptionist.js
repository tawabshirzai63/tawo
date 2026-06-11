const { ai, googleCalendar, twilio } = require('./services');
const db = require('./db');

class Receptionist {
    constructor() {
        this.activeSessions = new Map();
    }

    /**
     * Handle an incoming message or voice transcription.
     * @param {string} from - Caller phone number
     * @param {string} text - User input
     */
    async handleInput(from, text) {
        let session = this.activeSessions.get(from) || { history: [], status: 'chatting' };
        
        // Generate AI response
        const response = await ai.generateResponse(text, session.history);
        
        // Update history
        session.history.push({ role: 'user', content: text });
        session.history.push({ role: 'assistant', content: response });

        // Check if we should try to book an appointment
        if (text.toLowerCase().includes('confirm') || text.toLowerCase().includes('yes please')) {
            const bookingInfo = await ai.extractBookingInfo(text);
            if (bookingInfo) {
                const available = await googleCalendar.isSlotAvailable(bookingInfo.date, bookingInfo.time);
                if (available) {
                    const event = await googleCalendar.createEvent({
                        summary: `Detailing: ${bookingInfo.service}`,
                        description: `Booked via AI Receptionist for ${from}`,
                        start: `${bookingInfo.date}T${bookingInfo.time}:00Z`,
                        end: `${bookingInfo.date}T11:00:00Z`,
                        leadId: from // Using phone as leadId for now
                    });

                    await twilio.sendBookingConfirmation(from, bookingInfo);
                    
                    // Save to DB
                    this.saveLeadAndAppointment(from, bookingInfo, event.id);

                    this.activeSessions.set(from, { ...session, status: 'booked' });
                    return `Perfect! I've booked your ${bookingInfo.service} for ${bookingInfo.date} at ${bookingInfo.time}. You'll receive a confirmation SMS shortly.`;
                } else {
                    return "I'm sorry, that slot just became unavailable. Would you like to try another time?";
                }
            }
        }

        this.activeSessions.set(from, session);
        return response;
    }

    saveLeadAndAppointment(phone, booking, eventId) {
        // Implementation for saving to SQLite
        db.run("INSERT OR IGNORE INTO leads (phone, status) VALUES (?, ?)", [phone, 'Booked'], (err) => {
            if (err) console.error('Error saving lead:', err);
            
            db.get("SELECT id FROM leads WHERE phone = ?", [phone], (err, row) => {
                if (row) {
                    db.run("INSERT INTO appointments (lead_id, appointment_date, appointment_time, service_requested, google_calendar_event_id) VALUES (?, ?, ?, ?, ?)",
                        [row.id, booking.date, booking.time, booking.service, eventId]);
                }
            });
        });
    }
}

module.exports = new Receptionist();
