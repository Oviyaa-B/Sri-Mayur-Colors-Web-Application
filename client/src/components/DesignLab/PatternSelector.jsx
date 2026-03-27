import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import useDesignStore from '../../store/designStore';

// ── PATTERN DEFINITIONS
export const PATTERNS = [
  {
    id: 'Plain',
    label: 'Plain',
    description: 'Solid color, no pattern',
    icon: '◻',
    generate: (ctx, size, baseColor) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, size, size);
    },
  },
  {
    id: 'Stripes',
    label: 'Stripes',
    description: 'Vertical thin stripes',
    icon: '≡',
    generate: (ctx, size, baseColor) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = shiftColor(baseColor, -30);
      ctx.lineWidth = 4;
      for (let x = 0; x < size; x += 22) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke();
      }
    },
  },
  {
    id: 'Checkered',
    label: 'Checkered',
    description: 'Grid check pattern',
    icon: '⊞',
    generate: (ctx, size, baseColor) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, size, size);
      const cell = 28;
      const alt = shiftColor(baseColor, -40);
      for (let y = 0; y < size; y += cell) {
        for (let x = 0; x < size; x += cell) {
          if (((x / cell) + (y / cell)) % 2 === 0) {
            ctx.fillStyle = alt;
            ctx.fillRect(x, y, cell, cell);
          }
        }
      }
    },
  },
  {
    id: 'PolkaDots',
    label: 'Polka Dots',
    description: 'Evenly spaced dots',
    icon: '⚬',
    generate: (ctx, size, baseColor) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, size, size);
      const dot = shiftColor(baseColor, -45);
      const spacing = 30;
      const r = 7;
      for (let y = spacing / 2; y < size; y += spacing) {
        for (let x = spacing / 2; x < size; x += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = dot;
          ctx.fill();
        }
      }
    },
  },
  {
    id: 'DiagonalLines',
    label: 'Diagonal',
    description: 'Slanted diagonal stripes',
    icon: '⟋',
    generate: (ctx, size, baseColor) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, size, size);
      ctx.strokeStyle = shiftColor(baseColor, -35);
      ctx.lineWidth = 4;
      for (let i = -size; i < size * 2; i += 22) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + size, size); ctx.stroke();
      }
    },
  },
  {
    id: 'Floral',
    label: 'Floral',
    description: 'Repeated flower motifs',
    icon: '✿',
    generate: (ctx, size, baseColor) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, size, size);
      const petal = shiftColor(baseColor, -50);
      const center = shiftColor(baseColor, 60);
      const spacing = 48;
      for (let y = spacing / 2; y < size; y += spacing) {
        for (let x = spacing / 2; x < size; x += spacing) {
          // 5 petals
          for (let a = 0; a < 5; a++) {
            const angle = (a / 5) * Math.PI * 2;
            const px = x + Math.cos(angle) * 9;
            const py = y + Math.sin(angle) * 9;
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.fillStyle = petal;
            ctx.fill();
          }
          // Center
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = center;
          ctx.fill();
        }
      }
    },
  },
  {
    id: 'Abstract',
    label: 'Abstract',
    description: 'Random organic shapes',
    icon: '◈',
    generate: (ctx, size, baseColor) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, size, size);
      // Use seeded-ish positions (deterministic repeating tiles)
      const shapes = [
        [40, 40, 18, 12], [100, 80, 22, 14], [160, 30, 15, 20],
        [210, 120, 20, 12], [60, 160, 25, 10], [130, 200, 18, 16],
        [250, 60, 15, 20], [30, 260, 20, 14], [180, 240, 22, 12],
        [280, 200, 16, 18],
      ];
      for (const [sx, sy, rx, ry] of shapes) {
        ctx.beginPath();
        ctx.ellipse(sx, sy, rx, ry, sx * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = shiftColor(baseColor, -35 - ((sx + sy) % 30));
        ctx.fill();
      }
    },
  },
];

// ── COLOR SHIFT HELPER  (lightens/darkens a hex color by `amount`)
function shiftColor(hex, amount) {
  try {
    const n = parseInt(hex.replace('#', ''), 16);
    let r = Math.min(255, Math.max(0, (n >> 16) + amount));
    let g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amount));
    let b = Math.min(255, Math.max(0, (n & 0xff) + amount));
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  } catch { return hex; }
}

// ── MINI PATTERN PREVIEW (32×32 canvas rendered to data URL)
const PatternPreview = ({ patternDef, color }) => {
  const url = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    patternDef.generate(ctx, 64, color);
    return c.toDataURL();
  }, [patternDef.id, color]);

  return (
    <img
      src={url}
      alt={patternDef.label}
      className="w-full h-full object-cover rounded-xl"
    />
  );
};

// ── MAIN COMPONENT
const PatternSelector = () => {
  const { pattern, setPattern, color } = useDesignStore();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest">
        <span>⬡</span> Pattern
      </h2>
      <div className="grid grid-cols-4 gap-2">
        {PATTERNS.map((p) => {
          const isActive = pattern === p.id;
          return (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => setPattern(p.id)}
              title={p.label}
              className={`flex flex-col items-center gap-1.5 rounded-2xl p-1.5 border-2 transition-all duration-200
                ${isActive
                  ? 'border-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.35)] bg-blue-50'
                  : 'border-slate-100 bg-white hover:border-slate-300'
                }`}
            >
              <div className={`w-full aspect-square rounded-xl overflow-hidden border ${isActive ? 'border-blue-300' : 'border-slate-100'}`}>
                <PatternPreview patternDef={p} color={color} />
              </div>
              <span className={`text-[9px] font-black uppercase leading-tight text-center ${isActive ? 'text-blue-700' : 'text-slate-500'}`}>
                {p.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PatternSelector;
export { shiftColor };
