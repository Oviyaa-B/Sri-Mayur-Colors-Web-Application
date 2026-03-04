import React from 'react';
import { Factory, Globe, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 px-8 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        
        {/* Brand Identity */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Factory size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Sri Mayur Colors</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            A premier industrial dyeing facility specializing in AI-verified sustainable textile production for global export markets.
          </p>
        </div>

        {/* Professional Address */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Registered Facility</h4>
          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            255, Perumbaraikadu, <br />
            Kongu Vellalar Mandapam Backside, <br />
            Pallipalayam, Namakkal, <br />
            Tamil Nadu, India.
          </p>
        </div>

        {/* Global Support */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">Connect</h4>
          <div className="flex flex-col gap-4 text-sm font-bold">
            <a href="mailto:info@srimayur.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
              <Mail size={16} /> Export@srimayur.com
            </a>
            <div className="flex items-center gap-3 text-slate-300">
              <Phone size={16} /> +91 [Inquiry Line]
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Globe size={16} /> GOTS & ISO Certified Facility
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          &copy; 2026 Sri Mayur Colors | Industrial Intelligence Platform
        </span>
        <div className="flex gap-8">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-blue-500 transition-colors">Privacy Policy</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-blue-500 transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

// THIS LINE FIXES THE ERROR
export default Footer;