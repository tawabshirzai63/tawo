import React from 'react';
import { Calendar, Clock, MapPin, Car } from 'lucide-react';

const AppointmentDetails = ({ appointment }) => {
  if (!appointment) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        Your Appointment
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-blue-50 p-2 rounded-lg">
            <Car className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Service</p>
            <p className="text-slate-900 font-semibold">{appointment.service}</p>
            <p className="text-sm text-slate-600">{appointment.vehicle}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 bg-blue-50 p-2 rounded-lg">
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Date & Time</p>
            <p className="text-slate-900 font-semibold">{appointment.date}</p>
            <p className="text-slate-900">{appointment.time}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 bg-blue-50 p-2 rounded-lg">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Location</p>
            <p className="text-slate-900">{appointment.location}</p>
            <p className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">View on Maps</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
