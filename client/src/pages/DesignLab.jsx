import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronRight, Sparkles } from 'lucide-react';
import MaterialSelector from '../components/DesignLab/MaterialSelector';
import PatternSelector from '../components/DesignLab/PatternSelector';
import CanvasContainer from '../components/DesignLab/CanvasContainer';
import useDesignStore from '../store/designStore';

// ── PRESET COLORS ────────────────────────────────────────────
const PRESETS = [
  { hex: '#ffffff', label: 'White'  },
  { hex: '#1e293b', label: 'Navy'   },
  { hex: '#dc2626', label: 'Red'    },
  { hex: '#2563eb', label: 'Blue'   },
  { hex: '#16a34a', label: 'Green'  },
  { hex: '#d97706', label: 'Amber'  },
  { hex: '#7c3aed', label: 'Violet' },
  { hex: '#db2777', label: 'Pink'   },
  { hex: '#475569', label: 'Slate'  },
  { hex: '#000000', label: 'Black'  },
  { hex: '#f59e0b', label: 'Gold'   },
  { hex: '#0891b2', label: 'Cyan'   },
  { hex: '#84cc16', label: 'Lime'   },
  { hex: '#f97316', label: 'Orange' },
  { hex: '#ec4899', label: 'Rose'   },
];

// ── INLINE COLOR PICKER ──────────────────────────────────────
const SidebarColorPicker = () => {
  const { color, setColor } = useDesignStore();
  const [customOpen, setCustomOpen] = useState(false);
  const label = PRESETS.find(p => p.hex === color)?.label || 'Custom';

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest">
        <Palette size={14} /> Shirt Color
      </h2>

      {/* Color preview row */}
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-xl shadow-md cursor-pointer flex-shrink-0"
          style={{ backgroundColor: color, border: color === '#ffffff' ? '2px solid #e2e8f0' : '2px solid white' }}
          onClick={() => setCustomOpen(v => !v)}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black text-slate-800 truncate">{label}</p>
          <p className="text-[10px] font-mono text-slate-400 uppercase">{color}</p>
        </div>
        <button
          onClick={() => setCustomOpen(v => !v)}
          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wide"
        >
          {customOpen ? 'Close' : 'Custom'}
        </button>
      </div>

      {/* Expandable custom picker */}
      <AnimatePresence>
        {customOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="relative h-14 rounded-2xl overflow-hidden shadow-inner ring-1 ring-slate-200">
              <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-10"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: color }} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-bold mix-blend-difference text-white drop-shadow">Click to pick</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preset swatches */}
      <div className="grid grid-cols-5 gap-2">
        {PRESETS.map(p => (
          <motion.button
            key={p.hex}
            title={p.label}
            whileHover={{ scale: 1.18, y: -2 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => setColor(p.hex)}
            className={`w-full aspect-square rounded-full shadow-sm transition-all ${
              color === p.hex ? 'ring-2 ring-blue-500 ring-offset-2 scale-110 shadow-lg' : ''
            }`}
            style={{
              backgroundColor: p.hex,
              border: p.hex === '#ffffff' ? '1px solid #e2e8f0' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ── MATERIAL + PATTERN STATS BADGE ──────────────────────────
const CanvasBadge = () => {
  const { material, pattern } = useDesignStore();
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-white/80 shadow-sm text-xs font-bold text-slate-600">
        <Sparkles size={11} className="text-blue-500" />
        {material}
      </div>
      {pattern !== 'Plain' && (
        <div className="px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-white/80 shadow-sm text-xs font-bold text-slate-600">
          {pattern}
        </div>
      )}
    </div>
  );
};

// ── MAIN PAGE ────────────────────────────────────────────────
const DesignLab = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#f8fafc] overflow-hidden font-sans">

      {/* ── LEFT SIDEBAR ── */}
      <div
        className="w-full md:w-[360px] flex flex-col gap-5 p-5 bg-white/80 backdrop-blur-2xl border-r border-slate-200/60 z-10 overflow-y-auto shadow-[10px_0_30px_rgba(0,0,0,0.03)]"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Header */}
        <div className="pt-2 pb-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">3D Design Lab</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Customize your perfect apparel in real-time.</p>
        </div>

        {/* Color Picker */}
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
          <SidebarColorPicker />
        </div>

        {/* Pattern Selector */}
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
          <PatternSelector />
        </div>

        {/* Material / Fabric Selector */}
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
          <MaterialSelector />
        </div>

        {/* Color Matcher CTA */}
        <a
          href="/matcher"
          className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all group mb-2"
        >
          <div>
            <p className="text-sm font-black tracking-tight">AI Color Matcher</p>
            <p className="text-[10px] opacity-70 font-medium">Fabric-design compatibility engine</p>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* ── 3D CANVAS ── */}
      <div className="flex-1 relative bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
        />

        <CanvasContainer />

        {/* Floating overlay badges */}
        <div className="absolute top-5 left-5 z-10">
          <CanvasBadge />
        </div>

        {/* Interaction hint */}
        <div className="absolute bottom-5 right-5 z-10 text-[10px] font-medium text-slate-400/70 pointer-events-none text-right">
          <p>Drag · Zoom · Explore</p>
        </div>
      </div>
    </div>
  );
};

export default DesignLab;
