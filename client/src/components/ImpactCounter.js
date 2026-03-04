import React from 'react';
import { Droplets, Leaf, Wind, Zap } from 'lucide-react';

const ImpactCounter = ({ quantity }) => {
  // FIXED: Force 'quantity' to be a number to ensure calculations trigger correctly
  const qty = Number(quantity) || 0;

  // Industrial sustainability metrics based on Sri Mayur's green standards
  const waterSaved = (qty * 80).toLocaleString(); // 80 Liters saved per kg
  const co2Reduced = (qty * 2.5).toFixed(1); // 2.5kg CO2 reduced per kg
  const energySaved = (qty * 1.2).toFixed(1); // 1.2 kWh saved per kg

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
      {/* Background decoration for a high-standard feel */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <Leaf className="text-green-400" size={20} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">
            Real-Time Environmental Impact
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ImpactStat 
            icon={<Droplets className="text-blue-400" size={24} />} 
            value={waterSaved} 
            unit="Liters" 
            label="Water Recycled" 
          />
          <ImpactStat 
            icon={<Wind className="text-slate-400" size={24} />} 
            value={co2Reduced} 
            unit="Kg" 
            label="CO2 Offset" 
          />
          <ImpactStat 
            icon={<Zap className="text-yellow-400" size={24} />} 
            value={energySaved} 
            unit="kWh" 
            label="Clean Energy" 
          />
        </div>

        <p className="mt-10 pt-6 border-t border-white/10 text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-loose">
          Calculated based on GOTS & ISO verified zero-liquid discharge protocols at the Pallipalayam facility.
        </p>
      </div>
    </div>
  );
};

const ImpactStat = ({ icon, value, unit, label }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      {/* Visual weight on values for professional clarity */}
      <span className="text-3xl font-black tracking-tighter">{value}</span>
      <span className="text-xs font-bold text-slate-400 uppercase">{unit}</span>
    </div>
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

export default ImpactCounter;