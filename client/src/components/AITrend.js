import React from 'react';
import { Sparkles, BarChart3 } from 'lucide-react';

const AITrend = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-indigo-950 p-12 rounded-[3rem] text-white overflow-hidden shadow-2xl border border-white/10">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"></div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm tracking-widest uppercase mb-6">
            <Sparkles size={18} /> Smart Forecasting Model 2026
          </div>
          <h3 className="text-4xl font-black mb-6 leading-tight">AI Color Trend Intelligence</h3>
          <p className="text-blue-100/70 text-lg leading-relaxed mb-8 italic">
            "Our model predicts a 22% surge in Earth-toned linens for the European market next season. Be export-ready with Sri Mayur Colors."
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => <div key={i} className="h-10 w-10 rounded-full border-2 border-blue-900 bg-slate-800"></div>)}
            </div>
            <span className="text-sm font-medium text-blue-300 underline">Join 50+ Global Fashion Brands</span>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-inner">
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold">Trend Analysis</span>
            <BarChart3 className="text-blue-400" />
          </div>
          <div className="space-y-6">
            {[
              { label: 'Deep Indigo', val: '85%', color: 'bg-blue-600' },
              { label: 'Slate Grey', val: '64%', color: 'bg-slate-500' },
              { label: 'Moss Green', val: '42%', color: 'bg-green-700' }
            ].map(t => (
              <div key={t.label}>
                <div className="flex justify-between text-sm mb-2"><span className="text-slate-400">{t.label}</span><span>{t.val}</span></div>
                <div className="h-2 w-full bg-white/5 rounded-full"><div className={`${t.color} h-full rounded-full`} style={{width: t.val}}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITrend;