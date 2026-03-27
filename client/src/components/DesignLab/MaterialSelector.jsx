import React from 'react';
import useDesignStore from '../../store/designStore';
import { motion } from 'framer-motion';
import { CLOTH_DATABASE } from '../../config/designLabOptions';
import { Layers } from 'lucide-react';

// Category colour accents
const CATEGORY_COLORS = {
  'Natural':      { bg: 'bg-green-50',   border: 'border-green-400',  text: 'text-green-700',  dot: '#16a34a' },
  'Luxury':       { bg: 'bg-amber-50',   border: 'border-amber-400',  text: 'text-amber-700',  dot: '#d97706' },
  'Blended':      { bg: 'bg-blue-50',    border: 'border-blue-400',   text: 'text-blue-700',   dot: '#2563eb' },
  'Synthetic':    { bg: 'bg-purple-50',  border: 'border-purple-400', text: 'text-purple-700', dot: '#7c3aed' },
  'Semi-Synthetic':{ bg: 'bg-pink-50',   border: 'border-pink-400',   text: 'text-pink-700',   dot: '#db2777' },
  'Technical':    { bg: 'bg-slate-50',   border: 'border-slate-400',  text: 'text-slate-700',  dot: '#475569' },
  'Heavy Duty':   { bg: 'bg-stone-50',   border: 'border-stone-400',  text: 'text-stone-700',  dot: '#78716c' },
  'Sustainable':  { bg: 'bg-teal-50',    border: 'border-teal-400',   text: 'text-teal-700',   dot: '#0d9488' },
};

const StatBar = ({ label, value }) => (
  <div className="flex items-center gap-2 text-xs">
    <span className="w-16 text-slate-400 font-medium shrink-0">{label}</span>
    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-slate-700 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${Math.round(value * 100)}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
    <span className="w-7 text-right text-slate-400 font-mono">{Math.round(value * 100)}%</span>
  </div>
);

const MaterialSelector = () => {
  const { material, setMaterial } = useDesignStore();
  const options = Object.entries(CLOTH_DATABASE);
  const activeData = CLOTH_DATABASE[material];
  const catStyle = CATEGORY_COLORS[activeData?.category] || CATEGORY_COLORS['Natural'];

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xs font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest">
        <Layers size={14} /> Select Fabric
      </h2>

      {/* Material Cards */}
      <div className="flex flex-col gap-2.5">
        {options.map(([name, data]) => {
          const isActive = material === name;
          const cs = CATEGORY_COLORS[data.category] || CATEGORY_COLORS['Natural'];
          return (
            <motion.button
              key={name}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMaterial(name)}
              className={`text-left p-3.5 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden
                ${isActive
                  ? `${cs.bg} ${cs.border} shadow-md ring-1 ${cs.border}`
                  : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="material-active-bar"
                  className={`absolute left-0 top-0 bottom-0 w-1 ${cs.border.replace('border','bg')}`}
                />
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-bold text-sm tracking-tight ${isActive ? cs.text : 'text-slate-800'}`}>
                    {name}
                  </p>
                  <p className="text-[11px] mt-0.5 font-medium text-slate-400">
                    {data.fiber} · {data.gsm} GSM
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cs.bg} ${cs.text} border ${cs.border} ml-2 shrink-0`}
                >
                  {data.category}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active Material Stats Card */}
      {activeData && (
        <motion.div
          key={material}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-2xl border-2 ${catStyle.border} ${catStyle.bg} p-4 flex flex-col gap-3`}
        >
          <div className="flex items-center justify-between">
            <p className={`text-xs font-black uppercase tracking-wider ${catStyle.text}`}>{material}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catStyle.bg} ${catStyle.text} border ${catStyle.border}`}>
              {activeData.weave}
            </span>
          </div>
          <StatBar label="Smoothness" value={activeData.smoothness} />
          <StatBar label="Absorbency" value={activeData.absorbency} />
          <StatBar label="Porosity"   value={activeData.porosity}   />
          <p className="text-[11px] text-slate-500 italic leading-relaxed mt-1 border-t border-slate-200/60 pt-2">
            {activeData.characteristics}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MaterialSelector;
