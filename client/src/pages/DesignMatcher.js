import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Box, Layers, Info, ThumbsUp, ThumbsDown, Sparkles, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

import { CLOTH_DATABASE, PRINT_DESIGN_DATABASE, DESIGN_STYLES } from '../config/designLabOptions';


// ============================================
// COMPATIBILITY ALGORITHM
// ============================================
const inkCoverageMap = { 'Light': 0.2, 'Medium': 0.5, 'Heavy': 0.75, 'Very Heavy': 0.9, 'Light-Medium': 0.35, 'Medium-Heavy': 0.65 };

const calculateCompatibility = (clothMaterial, printDesign) => {
  const cloth = CLOTH_DATABASE[clothMaterial];
  const design = PRINT_DESIGN_DATABASE[printDesign];
  if (!cloth || !design) return { score: 50, factors: [], recommendation: 'Insufficient data' };
  
  const inkCoverageNumeric = inkCoverageMap[design.inkCoverage] || 0.5;
  const factors = []; let totalScore = 0;
  
  const absorbencyScore = (cloth.absorbency * 100) * (1 - inkCoverageNumeric);
  factors.push({ name: 'Ink Absorbency', score: Math.min(25, Math.round(absorbencyScore + 5)), rating: absorbencyScore > 20 ? 'Excellent' : absorbencyScore > 15 ? 'Good' : absorbencyScore > 10 ? 'Fair' : 'Poor', description: `${Math.round(cloth.absorbency * 100)}% vs ${design.inkCoverage}`, icon: '💧' });
  totalScore += Math.min(25, Math.round(absorbencyScore + 5));
  
  const smoothnessRequired = (design.complexity * 0.8 + 0.2);
  const smoothnessScore = (cloth.smoothness / smoothnessRequired) * 25;
  factors.push({ name: 'Surface Clarity', score: Math.min(25, Math.round(smoothnessScore)), rating: smoothnessScore > 20 ? 'Excellent' : smoothnessScore > 15 ? 'Good' : smoothnessScore > 10 ? 'Fair' : 'Poor', description: `${Math.round(cloth.smoothness * 100)}% for ${design.detailLevel}`, icon: '✨' });
  totalScore += Math.min(25, Math.round(smoothnessScore));
  
  const porosityScore = cloth.porosity * 25 * (1 - design.complexity * 0.3);
  factors.push({ name: 'Ink Penetration', score: Math.min(25, Math.round(porosityScore + 3)), rating: porosityScore > 18 ? 'Excellent' : porosityScore > 14 ? 'Good' : porosityScore > 8 ? 'Fair' : 'Poor', description: `${Math.round(cloth.porosity * 100)}% porosity`, icon: '🔍' });
  totalScore += Math.min(25, Math.round(porosityScore + 3));
  
  const gsmScore = Math.max(0, 25 - (Math.abs(cloth.gsm - 180) / 180 * 25));
  factors.push({ name: 'Weight Compatibility', score: Math.round(gsmScore), rating: gsmScore > 20 ? 'Excellent' : gsmScore > 15 ? 'Good' : gsmScore > 8 ? 'Fair' : 'Poor', description: `${cloth.gsm} GSM`, icon: '⚖️' });
  totalScore += Math.round(gsmScore);
  
  if (design.recommendedFabrics.some(f => f.toLowerCase().includes(clothMaterial.toLowerCase()) || clothMaterial.toLowerCase().includes(f.toLowerCase()))) {
    totalScore += 10;
    factors.push({ name: 'Design Match', score: 10, rating: 'Perfect Match', description: 'Recommended fabric', icon: '🎯' });
  }
  
  const finalScore = Math.min(100, Math.max(0, totalScore));
  return {
    score: finalScore, factors, recommendation: finalScore >= 85 ? 'Excellent choice!' : finalScore >= 70 ? 'Good compatibility' : finalScore >= 50 ? 'Moderate' : 'Not recommended',
    suitable: finalScore >= 50,
    printMethod: Object.entries(cloth.printCompatibility).sort((a, b) => b[1] - a[1])[0][0]
  };
};

const getRecommendedDesigns = (clothMaterial, currentDesign) => {
  return Object.entries(PRINT_DESIGN_DATABASE)
    .map(([name, d]) => ({ name, score: calculateCompatibility(clothMaterial, name).score, category: d.category }))
    .filter(d => d.name !== currentDesign).sort((a, b) => b.score - a.score).slice(0, 4);
};

// ============================================
// MAIN COMPONENT
// ============================================
const DesignMatcher = () => {
  const [cloth, setCloth] = useState('Pure Cotton');
  const [printDesign, setPrintDesign] = useState('Abstract Floral');
  const [showDetails, setShowDetails] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const analysis = useMemo(() => calculateCompatibility(cloth, printDesign), [cloth, printDesign]);
  const recommendations = useMemo(() => getRecommendedDesigns(cloth, printDesign), [cloth, printDesign]);
  
  useEffect(() => { setIsAnalyzing(true); const t = setTimeout(() => setIsAnalyzing(false), 600); return () => clearTimeout(t); }, [cloth, printDesign]);
  
  const handleClothChange = useCallback((e) => setCloth(e.target.value), []);
  const handlePrintDesignChange = useCallback((e) => setPrintDesign(e.target.value), []);
  
  const clothData = CLOTH_DATABASE[cloth];
  const designData = PRINT_DESIGN_DATABASE[printDesign];
  const designStyle = DESIGN_STYLES[printDesign];
  
  return (
    <div className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles size={14} /> Real-Time AI Analysis Engine
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight text-center uppercase">AI Design Matcher</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium">Intelligent fabric-design compatibility analysis based on material properties</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SELECTION PANEL */}
          <div className="lg:col-span-3 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tighter">
              <Box className="text-blue-600" size={20} /> Select Materials
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Cloth Material</label>
                <select value={cloth} onChange={handleClothChange} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer">
                  {Object.keys(CLOTH_DATABASE).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Print Design</label>
                <select value={printDesign} onChange={handlePrintDesignChange} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer">
                  {Object.keys(PRINT_DESIGN_DATABASE).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              {clothData && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Material Properties</p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><p className="text-slate-400">Weight</p><p className="font-black text-slate-800">{clothData.gsm} GSM</p></div>
                    <div><p className="text-slate-400">Thread</p><p className="font-black text-slate-800">{clothData.threadCount}</p></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PREVIEW PANEL - WITH CSS PATTERNS */}
          <div className="lg:col-span-5 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 text-center italic">Visual Preview</h3>
            
            {/* CSS Pattern Preview */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transition-all duration-700" style={{ backgroundColor: designStyle.backgroundColor }}>
              {/* CSS Pattern Layer */}
              <div className="absolute inset-0" style={{ backgroundImage: designStyle.patternData, backgroundSize: '80px 80px', opacity: designStyle.overlayOpacity, mixBlendMode: designStyle.mixBlend }} />
              
              {/* Fabric Texture */}
              <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')", backgroundSize: '60px 60px' }} />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)' }} />
              
              {/* Design Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[9px] font-black uppercase" style={{ backgroundColor: designStyle.accentColor, color: ['Tribal Print', 'Camouflage', 'Screen Print Bold'].includes(printDesign) ? '#fff' : '#000' }}>
                {printDesign.split(' ')[0]}
              </div>
              
              {/* Suitability Badge */}
              <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-black uppercase ${analysis.suitable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {analysis.suitable ? 'Suitable' : 'Not Suitable'}
              </div>
            </div>
            
            {/* Pattern Info */}
            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Pattern: {designStyle.pattern}</p>
              <p className="text-sm font-medium text-slate-700">{designStyle.description}</p>
            </div>
            
            {/* Print Method */}
            <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">Recommended Print Method</p>
              <p className="text-lg font-black text-blue-900">{analysis.printMethod}</p>
            </div>
          </div>

          {/* AI SCORING */}
          <div className="lg:col-span-4 bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col shadow-xl">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={439.8} strokeDashoffset={439.8 - (439.8 * analysis.score) / 100} className={`${analysis.score > 85 ? 'text-green-500' : analysis.score > 60 ? 'text-yellow-500' : 'text-red-500'} transition-all`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-black ${isAnalyzing ? 'scale-110' : 'scale-100'} transition-all`}>{analysis.score}%</span>
                  {isAnalyzing && <RefreshCw className="w-5 h-5 animate-spin text-blue-400 mt-1" />}
                </div>
              </div>
              <h4 className="text-xl font-bold uppercase">{analysis.score >= 85 ? 'Excellent Match' : analysis.score >= 70 ? 'Good Match' : analysis.score >= 50 ? 'Moderate' : 'Poor Match'}</h4>
            </div>
            
            <div className={`p-4 rounded-2xl mb-6 ${analysis.suitable ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              <p className="text-sm font-medium">{analysis.recommendation}</p>
            </div>
            
            <button onClick={() => setShowDetails(!showDetails)} className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white mb-4">
              <Info size={16} /> {showDetails ? 'Hide' : 'Show'} Breakdown {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {showDetails && (
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-64">
                {analysis.factors.map((factor, idx) => (
                  <div key={idx} className="p-3 bg-white/5 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase">{factor.icon} {factor.name}</span>
                      <span className={`text-xs font-black px-2 py-1 rounded-full ${factor.score >= 20 ? 'bg-green-500/20 text-green-400' : factor.score >= 15 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{factor.rating}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{factor.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            <button onClick={() => setShowRecommendations(!showRecommendations)} className="mt-auto flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-sm font-bold uppercase">
              <ThumbsUp size={18} /> Get Design Alternatives
            </button>
            
            {showRecommendations && recommendations.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Top for {cloth}</p>
                {recommendations.map((rec, idx) => (
                  <button key={rec.name} onClick={() => setPrintDesign(rec.name)} className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-300">{rec.name}</span>
                    <span className={`text-xs font-black ${rec.score >= 80 ? 'text-green-400' : rec.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{rec.score}%</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignMatcher;
export { CLOTH_DATABASE, PRINT_DESIGN_DATABASE, calculateCompatibility, DESIGN_STYLES };

