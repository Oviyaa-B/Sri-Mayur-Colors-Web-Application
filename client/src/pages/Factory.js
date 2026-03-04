import React from 'react';
import { CheckCircle2, Droplets, Zap } from 'lucide-react';

const Factory = () => {
  return (
    <div className="pt-24 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Infrastructure</span>
            <h2 className="text-5xl font-bold text-slate-900 mb-8 leading-[1.1]">Sustainable Industrial <br/>Dyeing Facilities</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Located near Perundurai, our factory uses Zero Liquid Discharge (ZLD) technology to process high-quality fabrics while protecting the local ecosystem.
            </p>
            <div className="space-y-4">
              {[
                { icon: <Droplets className="text-blue-500" />, text: "Automated Effluent Treatment" },
                { icon: <Zap className="text-orange-500" />, text: "Computerized Color Matching" },
                { icon: <CheckCircle2 className="text-green-500" />, text: "Real-time Quality Monitoring" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-slate-50 rounded-xl hover:bg-slate-50 transition-colors">
                  {item.icon} <span className="font-semibold text-slate-800">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[600px]">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Machinery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factory;