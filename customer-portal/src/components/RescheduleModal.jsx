import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';

const RescheduleModal = ({ isOpen, onClose, onReschedule, currentAppointment }) => {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedTime, setSelectedTime] = useState(null);
  
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));
  const availableTimes = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Reschedule Appointment</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Select New Date
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {next7Days.map((date) => (
                <button
                  key={date.toString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center min-w-[64px] p-3 rounded-xl border transition-all ${
                    isSameDay(selectedDate, date)
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold opacity-80">{format(date, 'EEE')}</span>
                  <span className="text-lg font-bold">{format(date, 'd')}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Select Available Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    selectedTime === time
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!selectedTime}
              onClick={() => onReschedule(selectedDate, selectedTime)}
              className="flex-[2] px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Confirm New Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
