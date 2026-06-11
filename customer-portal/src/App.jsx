import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, XCircle, Phone } from 'lucide-react';
import AppointmentDetails from './components/AppointmentDetails';
import ContactBusiness from './components/ContactBusiness';
import RescheduleModal from './components/RescheduleModal';
import CancelModal from './components/CancelModal';
import { format } from 'date-fns';

const App = () => {
  const [appointment, setAppointment] = useState(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null);

  // Mock data fallback
  const mockAppointment = {
    id: 'apt-123',
    service: 'Full Ceramic Coating Package',
    vehicle: '2024 Tesla Model Y (Black)',
    date: 'Wednesday, June 18, 2024',
    time: '10:30 AM',
    location: '123 Detailers Lane, Sacramento, CA',
  };

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setAppointment(mockAppointment);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleReschedule = (newDate, newTime) => {
    setAppointment({
      ...appointment,
      date: format(newDate, 'eeee, MMMM d, yyyy'),
      time: newTime,
    });
    setIsRescheduleOpen(false);
    showStatus('Appointment rescheduled successfully!');
  };

  const handleCancel = () => {
    setAppointment(null);
    setIsCancelOpen(false);
    showStatus('Appointment cancelled successfully.');
  };

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Cali Performance</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {statusMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center justify-between animate-in slide-in-from-top duration-300">
            <span className="font-medium text-sm">{statusMessage}</span>
            <button onClick={() => setStatusMessage(null)}>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        )}

        {appointment ? (
          <>
            <section>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-slate-900">Manage Appointment</h2>
                <p className="text-slate-500">View or change your detailing session</p>
              </div>
              <AppointmentDetails appointment={appointment} />
            </section>

            <section className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setIsRescheduleOpen(true)}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group"
              >
                <div className="bg-blue-50 p-3 rounded-full group-hover:bg-blue-100 transition-colors">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <span className="font-semibold text-sm">Reschedule</span>
              </button>

              <button 
                onClick={() => setIsCancelOpen(true)}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-red-400 hover:shadow-sm transition-all group"
              >
                <div className="bg-red-50 p-3 rounded-full group-hover:bg-red-100 transition-colors">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <span className="font-semibold text-sm text-slate-700">Cancel</span>
              </button>
            </section>

            <section>
              <ContactBusiness />
            </section>
          </>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold">No Appointment Found</h2>
            <p className="text-slate-500 max-w-sm mx-auto">
              You don't have any active appointments scheduled at this time. Need a detail?
            </p>
            <button className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Book a New Service
            </button>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-slate-400 text-xs px-4">
        <p>&copy; 2024 Cali Performance Detailing. All rights reserved.</p>
        <p className="mt-1">Professional Auto Detailing Sacramento, CA</p>
      </footer>

      {/* Modals */}
      <RescheduleModal 
        isOpen={isRescheduleOpen} 
        onClose={() => setIsRescheduleOpen(false)}
        onReschedule={handleReschedule}
        currentAppointment={appointment}
      />
      <CancelModal 
        isOpen={isCancelOpen} 
        onClose={() => setIsCancelOpen(false)}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default App;
