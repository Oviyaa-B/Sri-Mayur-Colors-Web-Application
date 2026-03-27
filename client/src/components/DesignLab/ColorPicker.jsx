import React, { useState } from 'react';
import useDesignStore from '../../store/designStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';

const presetColors = [
  '#ffffff', // White
  '#1e293b', // Slate 800
  '#dc2626', // Red 600
  '#2563eb', // Blue 600
  '#16a34a', // Green 600
  '#d97706', // Amber 600
  '#7c3aed', // Violet 600
  '#db2777', // Pink 600
  '#475569', // Slate 600
  '#000000', // Jet Black
];

const ColorPicker = () => {
  const { color, setColor } = useDesignStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-end z-20 font-sans">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-colors hover:bg-slate-800 text-white"
      >
        {isOpen ? <X size={24} /> : <Palette size={24} />}
      </motion.button>

      {/* Popout Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute top-16 right-0 mt-4 w-72 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-6 overflow-hidden origin-top-right"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Base Color</h3>
              <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-mono text-slate-500 font-bold uppercase">
                {color}
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              {/* Custom Color Picker wrapper for styling the native input */}
              <div className="relative h-16 rounded-2xl overflow-hidden shadow-inner ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-blue-500 bg-slate-50">
                <input 
                  type="color" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute -top-4 -left-4 w-32 h-32 cursor-pointer opacity-0"
                  style={{ width: '200%', height: '200%' }} // cover entire area
                />
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ backgroundColor: color }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference">
                  <span className="text-xs font-bold text-white/80 drop-shadow-md">Select Custom</span>
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full" />

              {/* Presets grid */}
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">Quick Presets</p>
                <div className="grid grid-cols-5 gap-3">
                  {presetColors.map((c) => (
                    <motion.button
                      key={c}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => setColor(c)}
                      className={`w-full aspect-square rounded-full flex items-center justify-center transition-all ${
                        color === c ? 'ring-2 ring-offset-2 ring-blue-500 scale-110 shadow-lg' : 'shadow-inner'
                      }`}
                      style={{ 
                        backgroundColor: c, 
                        border: c === '#ffffff' ? '1px solid #e2e8f0' : 'none' 
                      }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
