import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, Box, Layers, Info } from 'lucide-react';

const DesignMatcher = () => {
  const [cloth, setCloth] = useState('Oxford Weave');
  const [printDesign, setPrintDesign] = useState('Vintage Stripes');
  const [score, setScore] = useState(0);

  // --- REFINED PHYSICAL CLOTH DATA ---
  const clothTextures = {
    'Oxford Weave': { color: '#ffffff', pattern: 'pinstriped-suit.png', gsm: 140, threadCount: '40s x 40s', clarityBoost: 1.0 },
    'Silk Satin': { color: '#fffaf0', pattern: 'silk.png', gsm: 80, threadCount: '60s x 60s', clarityBoost: 1.2 },
    'Pure Linen': { color: '#fdf6e3', pattern: 'natural-paper.png', gsm: 160, threadCount: '25s x 25s', clarityBoost: 0.8 },
    'Twill Diagonal': { color: '#f1f5f9', pattern: 'diagonal-striped-brick.png', gsm: 220, threadCount: '2/20s x 10s', clarityBoost: 0.9 },
    'Honeycomb Pique': { color: '#cbd5e1', pattern: 'honeycomb.png', gsm: 240, threadCount: '30s Combed', clarityBoost: 0.4 },
    'Heavy Canvas': { color: '#e5e4e2', pattern: 'canvas.png', gsm: 400, threadCount: '10s x 10s', clarityBoost: 0.5 }
  };

  const printPatterns = {
    'Vintage Stripes': 'https://www.transparenttextures.com/patterns/vertical-cloth.png',
    'Minimalist Geometric': 'https://www.transparenttextures.com/patterns/cubes.png',
    'Abstract Floral': 'https://www.transparenttextures.com/patterns/broken-noise.png',
    'Corporate Logo': 'https://www.transparenttextures.com/patterns/carbon-fibre.png',
    'Polka Dots': 'https://www.transparenttextures.com/patterns/shattered-island.png'
  };

  // --- AI CLARITY INDEX LOGIC ---
  const calculateCompatibility = () => {
    if (cloth === 'Silk Satin' && printDesign === 'Minimalist Geometric') return 100;
    if (cloth === 'Oxford Weave' && printDesign === 'Vintage Stripes') return 98;
    if (cloth === 'Heavy Canvas') return 35;
    return Math.floor(75 * clothTextures[cloth].clarityBoost + 10);
  };

  useEffect(() => {
    setScore(calculateCompatibility());
  }, [cloth, printDesign]);

  return (
    <div className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-4">
            <Layers size={14} /> Industrial Simulation v3.2
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight text-center uppercase">AI Design Matcher</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium">Test industrial ink clarity against professional cloth weaves.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SELECTION PANEL */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tighter">
              <Box className="text-blue-600" size={20} /> Build Profile
            </h3>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Select Cloth Weave</label>
                <select value={cloth} onChange={(e) => setCloth(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all cursor-pointer">
                  {Object.keys(clothTextures).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Apply Print Pattern</label>
                <select value={printDesign} onChange={(e) => setPrintDesign(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all cursor-pointer">
                  {Object.keys(printPatterns).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Weight (GSM)</p>
                      <p className="text-sm font-black text-slate-800">{clothTextures[cloth].gsm}</p>
                  </div>
                  <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Threads</p>
                      <p className="text-sm font-black text-slate-800">{clothTextures[cloth].threadCount}</p>
                  </div>
              </div>
            </div>
          </div>

          {/* HIGH-VISIBILITY 3D RENDER */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 text-center italic">Macro 3D Render</h3>
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-2xl border-4 border-white">
              <div className="absolute inset-0 transition-all duration-700" style={{ backgroundColor: clothTextures[cloth]?.color }} />
              <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/${clothTextures[cloth]?.pattern}')`, backgroundSize: '250px' }} />
              
              {/* ENHANCED VISIBILITY LAYER FOR STRIPES & LOGOS */}
              <div className="absolute inset-0 mix-blend-darken opacity-100 transition-all duration-500"
                   style={{ 
                     backgroundImage: `url('${printPatterns[printDesign]}')`, 
                     backgroundSize: printDesign === 'Vintage Stripes' ? '300px' : '150px',
                     filter: 'contrast(1.6) brightness(0.8)' 
                   }} />
              
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />
            </div>
            <p className="mt-6 text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">Simulation: {printDesign}</p>
          </div>

          {/* AI SCORING */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-center items-center text-center shadow-xl">
            <div className="relative mb-6">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" 
                  strokeDasharray={439.8} strokeDashoffset={439.8 - (439.8 * score) / 100}
                  className={`${score > 85 ? 'text-green-500' : score > 60 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-4xl font-black">{score}%</span>
            </div>
            <h4 className="text-xl font-bold mb-3 uppercase tracking-tighter">Clarity Index</h4>
            <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase ${
              score > 85 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {score > 85 ? <CheckCircle2 size={16}/> : <AlertTriangle size={16}/>}
              {score > 85 ? "Retail Ready" : "Lab Review"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignMatcher;