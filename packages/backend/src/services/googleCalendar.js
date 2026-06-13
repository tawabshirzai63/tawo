const { google } = require('googleapis');
const moment = require('moment');

/**
 * Google Calendar Service (Mocked for testing)
 */
class GoogleCalendarService {
    constructor() {
        this.businessHours = {
            start: 6, // 6:00 AM
            end: 22   // 10:00 PM
        };
        this.mockEvents = []; // In-memory mock storage
    }

    /**
     * Check availability for a specific date and time slot.
     * @param {string} date - ISO date string
     * @param {string} time - HH:mm format
     * @param {number} durationMinutes - duration in minutes
     * @returns {Promise<boolean>}
     */
    async isSlotAvailable(date, time, durationMinutes = 60) {
        const start = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
        const end = moment(start).add(durationMinutes, 'minutes');

        // Check business hours
        if (start.hour() < this.businessHours.start || end.hour() >= this.businessHours.end) {
            return false;
        }

        // Check against mock events
        const isOverlap = this.mockEvents.some(event => {
            const eventStart = moment(event.start);
            const eventEnd = moment(event.end);
            return (start.isBefore(eventEnd) && end.isAfter(eventStart));
        });

        return !isOverlap;
    }

    /**
     * Create a new appointment event.
     * @param {object} details - { summary, description, start, end, leadId }
     */
    async createEvent(details) {
        const { summary, description, start, end, leadId } = details;
        
        // In a real implementation, this would call google-calendar API
        const newEvent = {
            id: `mock_event_${Date.now()}`,
            summary,
            description,
            start,
            end,
            leadId,
            status: 'confirmed'
        };

        this.mockEvents.push(newEvent);
        console.log('Mock Google Calendar Event Created:', newEvent);
        return newEvent;
    }

    /**
     * Get available slots for a given day.
     * @param {string} date - YYYY-MM-DD
     */
    async getAvailableSlots(date) {
        const slots = [];
        let current = moment(`${date} 06:00`, 'YYYY-MM-DD HH:mm');
        const endDay = moment(`${date} 22:00`, 'YYYY-MM-DD HH:mm');

        while (current.isBefore(endDay)) {
            const timeStr = current.format('HH:mm');
            const available = await this.isSlotAvailable(date, timeStr);
            if (available) {
                slots.push(timeStr);
            }
            current.add(60, 'minutes'); // Assuming 1-hour slots for now
        }

        return slots;
    }

    /**
     * Cancel an event
     * @param {string} eventId 
     */
    async cancelEvent(eventId) {
        this.mockEvents = this.mockEvents.filter(e => e.id !== eventId);
        console.log(`Mock Google Calendar Event Cancelled: ${eventId}`);
        return true;
    }

    /**
     * Reschedule an event
     * @param {string} eventId 
     * @param {string} newDate 
     * @param {string} newTime 
     * @param {number} durationMinutes 
     */
    async rescheduleEvent(eventId, newDate, newTime, durationMinutes = 60) {
        const eventIndex = this.mockEvents.findIndex(e => e.id === eventId);
        if (eventIndex === -1) return null;

        const start = moment(`${newDate} ${newTime}`, 'YYYY-MM-DD HH:mm').toISOString();
        const end = moment(`${newDate} ${newTime}`, 'YYYY-MM-DD HH:mm').add(durationMinutes, 'minutes').toISOString();

        this.mockEvents[eventIndex].start = start;
        this.mockEvents[eventIndex].end = end;
        
        console.log(`Mock Google Calendar Event Rescheduled: ${eventId} to ${start}`);
        return this.mockEvents[eventIndex];
    }
}

module.exports = new GoogleCalendarService();
