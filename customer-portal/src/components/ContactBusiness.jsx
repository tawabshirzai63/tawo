import React from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const ContactBusiness = () => {
  return (
    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact Us</h2>
      
      <div className="space-y-4">
        <a 
          href="tel:9165550123" 
          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-400 transition-colors group"
        >
          <Phone className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Call or Text</p>
            <p className="text-slate-900 font-semibold group-hover:text-blue-600 transition-colors">(916) 555-0123</p>
          </div>
        </a>

        <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
          <MapPin className="w-5 h-5 text-blue-600 mt-1" />
          <div className="flex-1">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Address</p>
            <p className="text-slate-900 font-semibold">123 Detailers Lane</p>
            <p className="text-slate-900">Sacramento, CA 95814</p>
            <a 
              href="https://goo.gl/maps/example" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-1 text-sm text-blue-600 font-medium hover:underline"
            >
              Get Directions
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-slate-200 h-48 bg-slate-200">
          {/* Placeholder for Google Maps Embed */}
          <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm italic">
            Google Maps Embed Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBusiness;
