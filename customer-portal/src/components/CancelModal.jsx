import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const CancelModal = ({ isOpen, onClose, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-2">Cancel Appointment?</h3>
          <p className="text-slate-600 mb-8">
            Are you sure you want to cancel your detailing appointment? This action cannot be undone.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={onCancel}
              className="w-full px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
            >
              Yes, Cancel Appointment
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              No, Keep It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
