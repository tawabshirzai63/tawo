const { notificationEngine } = require('../src/services');
const db = require('../src/db');
const moment = require('moment');

async function testNotifications() {
    console.log('--- Testing Notification Engine ---');

    // 1. Test Missed Call Recovery
    console.log('\nTesting Missed Call Recovery:');
    await notificationEngine.handleMissedCall('+19165559999');

    // 2. Test Reminders
    console.log('\nTesting Reminders (Shifting appointment times):');
    
    const tomorrow24h = moment().add(24, 'hours').format('YYYY-MM-DD');
    const time24h = moment().add(24, 'hours').format('HH:mm');
    
    const today2h = moment().add(2, 'hours').format('YYYY-MM-DD');
    const time2h = moment().add(2, 'hours').format('HH:mm');

    // Clear existing for clean test
    db.run("DELETE FROM appointments", [], () => {
        db.run("DELETE FROM leads", [], () => {
            // Insert mock leads and appointments
            db.run("INSERT INTO leads (id, phone) VALUES (10, '+19165552424')", [], () => {
                db.run("INSERT INTO appointments (lead_id, appointment_date, appointment_time, service_requested, status) VALUES (10, ?, ?, 'Full Detail', 'Scheduled')", [tomorrow24h, time24h], () => {
                    db.run("INSERT INTO leads (id, phone) VALUES (11, '+19165550202')", [], () => {
                        db.run("INSERT INTO appointments (lead_id, appointment_date, appointment_time, service_requested, status) VALUES (11, ?, ?, 'Ceramic Coating', 'Scheduled')", [today2h, time2h], async () => {
                            
                            console.log('Mock appointments inserted. Checking reminders...');
                            await notificationEngine.checkReminders();
                            
                            setTimeout(() => {
                                console.log('\nVerifying logs in DB:');
                                db.all("SELECT * FROM logs", [], (err, rows) => {
                                    console.log(JSON.stringify(rows, null, 2));
                                });
                            }, 1000);
                        });
                    });
                });
            });
        });
    });
}

testNotifications().catch(console.error);
