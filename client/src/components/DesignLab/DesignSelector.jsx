import React from 'react';
import useDesignStore from '../../store/designStore';
import { motion } from 'framer-motion';
import { PRINT_DESIGN_DATABASE, DESIGN_STYLES } from '../../config/designLabOptions';
import { Hexagon } from 'lucide-react';

const DesignSelector = () => {
  const { decal, setDecal } = useDesignStore();
  const options = Object.keys(PRINT_DESIGN_DATABASE);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xs font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest">
        <Hexagon size={14} /> Print Graphic
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {/* None Option */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDecal(null)}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 min-h-[100px]
            ${decal === null 
              ? 'bg-blue-50/50 border-blue-500 shadow-[0_8px_20px_-6px_rgba(59,130,246,0.3)] ring-1 ring-blue-500' 
              : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
            }
          `}
        >
          <span className="text-xs font-bold uppercase tracking-wide text-slate-400">None</span>
        </motion.button>

        {/* CSS Pattern Defined Options */}
        {options.map((name) => {
          const isActive = decal === name;
          const style = DESIGN_STYLES[name] || {};
          
          // Generate a mini CSS preview box replicating the Color Matcher previews
          const previewStyle = style.patternData ? {
            backgroundColor: style.backgroundColor,
            backgroundImage: style.patternData,
            backgroundSize: '20px 20px',
            backgroundBlendMode: style.mixBlend,
          } : { backgroundColor: '#e2e8f0' };

          return (
            <motion.button
              key={name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDecal(name)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 min-h-[100px] overflow-hidden group relative
                ${isActive 
                  ? 'bg-blue-50/50 border-blue-500 shadow-[0_8px_20px_-6px_rgba(59,130,246,0.3)] ring-1 ring-blue-500 z-10' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }
              `}
            >
              <div 
                className="w-12 h-12 rounded-full mb-3 shadow-inner border border-white/50"
                style={previewStyle}
              />
              <span className={`text-[10px] font-bold uppercase tracking-wider text-center ${isActive ? 'text-blue-900' : 'text-slate-600'}`}>
                {name}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  );
};

export default DesignSelector;
