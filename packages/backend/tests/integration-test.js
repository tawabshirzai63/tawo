const { googleCalendar, twilio } = require('../src/services');
const moment = require('moment');

async function runTest() {
    console.log('--- Testing Google Calendar Service ---');
    const date = moment().add(1, 'days').format('YYYY-MM-DD');
    const time = '10:00';
    
    const available = await googleCalendar.isSlotAvailable(date, time);
    console.log(`Is ${date} at ${time} available? ${available}`);

    if (available) {
        const event = await googleCalendar.createEvent({
            summary: 'Detailing Appointment',
            description: 'Full Ceramic Coating',
            start: moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString(),
            end: moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').add(2, 'hours').toISOString(),
            leadId: 1
        });
        console.log('Created Event:', event);

        const stillAvailable = await googleCalendar.isSlotAvailable(date, time);
        console.log(`Is ${date} at ${time} still available? ${stillAvailable}`);
    }

    const slots = await googleCalendar.getAvailableSlots(date);
    console.log(`Available slots for ${date}: ${slots.join(', ')}`);

    console.log('\n--- Testing Twilio Service ---');
    await twilio.sendBookingConfirmation('+19165550199', {
        service: 'Ceramic Coating',
        date,
        time
    });

    await twilio.sendReminder('+19165550199', {
        service: 'Ceramic Coating',
        time
    }, 2);
}

runTest().catch(console.error);
