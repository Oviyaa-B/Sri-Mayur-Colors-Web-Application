import React, { useMemo, useEffect } from 'react';

// ============================================
// COMPREHENSIVE DESIGN VISUAL STYLES WITH PATTERNS
// Each design has unique colors, patterns, and filters
// ============================================
const DESIGN_STYLES = Object.freeze({
  // Modern Designs
  'Minimalist Geometric': {
    filter: 'contrast(1.1) brightness(1.05) saturate(0.8)',
    backgroundColor: '#f8fafc',
    patternColor: '#1e293b',
    pattern: 'geometric',
    patternData: 'repeating-linear-gradient(45deg, #1e293b 0px, #1e293b 2px, transparent 2px, transparent 20px)',
    overlayOpacity: 0.2,
    mixBlend: 'multiply',
    accentColor: '#3b82f6',
    description: 'Clean lines, geometric shapes'
  },
  
  'Photo-Realistic': {
    filter: 'contrast(1.05) brightness(1.1) saturate(1.2)',
    backgroundColor: '#f1f5f9',
    patternColor: '#475569',
    pattern: 'photo',
    patternData: 'radial-gradient(circle at 25% 25%, #64748b 2px, transparent 2px), radial-gradient(circle at 75% 75%, #475569 2px, transparent 2px)',
    overlayOpacity: 0.25,
    mixBlend: 'normal',
    accentColor: '#8b5cf6',
    description: 'Detailed imagery, photographs'
  },
  
  // Classic Designs
  'Vintage Stripes': {
    filter: 'sepia(0.2) contrast(1.15) brightness(0.95)',
    backgroundColor: '#fef3c7',
    patternColor: '#92400e',
    pattern: 'stripes',
    patternData: 'repeating-linear-gradient(90deg, #92400e 0px, #92400e 4px, #fef3c7 4px, #fef3c7 20px)',
    overlayOpacity: 0.4,
    mixBlend: 'multiply',
    accentColor: '#d97706',
    description: 'Horizontal/vertical retro stripes'
  },
  
  'Polka Dots': {
    filter: 'contrast(1.1) brightness(1.0) saturate(1.1)',
    backgroundColor: '#fdf4ff',
    patternColor: '#be185d',
    pattern: 'dots',
    patternData: 'radial-gradient(circle, #be185d 8px, transparent 8px)',
    overlayOpacity: 0.35,
    mixBlend: 'multiply',
    accentColor: '#db2777',
    description: 'Repeating circular patterns'
  },
  
  // Artistic Designs
  'Abstract Floral': {
    filter: 'contrast(0.95) brightness(1.05) saturate(1.3)',
    backgroundColor: '#fdf2f8',
    patternColor: '#9d174d',
    pattern: 'floral',
    patternData: 'radial-gradient(ellipse at 50% 50%, #ec4899 0px, transparent 50%), radial-gradient(ellipse at 20% 80%, #f472b6 0px, transparent 30%), radial-gradient(ellipse at 80% 20%, #db2777 0px, transparent 30%)',
    overlayOpacity: 0.45,
    mixBlend: 'multiply',
    accentColor: '#ec4899',
    description: 'Organic shapes, nature-inspired'
  },
  
  'Watercolor Effect': {
    filter: 'contrast(0.85) brightness(1.15) saturate(1.1) blur(1px)',
    backgroundColor: '#f0fdfa',
    patternColor: '#0d9488',
    pattern: 'watercolor',
    patternData: 'radial-gradient(ellipse at 30% 30%, rgba(20, 184, 166, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(45, 212, 191, 0.25) 0%, transparent 40%), radial-gradient(ellipse at 50% 80%, rgba(20, 184, 166, 0.2) 0%, transparent 45%)',
    overlayOpacity: 0.5,
    mixBlend: 'soft-light',
    accentColor: '#14b8a6',
    description: 'Soft blending, painterly look'
  },
  
  'Tie-Dye': {
    filter: 'contrast(1.1) brightness(1.0) saturate(1.5)',
    backgroundColor: '#fef2f2',
    patternColor: '#dc2626',
    pattern: 'tiedye',
    patternData: 'radial-gradient(circle at 50% 0%, #ef4444 0%, transparent 50%), radial-gradient(circle at 100% 50%, #f87171 0%, transparent 40%), radial-gradient(circle at 50% 100%, #dc2626 0%, transparent 50%), radial-gradient(circle at 0% 50%, #fca5a5 0%, transparent 40%)',
    overlayOpacity: 0.55,
    mixBlend: 'color-burn',
    accentColor: '#ef4444',
    description: 'Color blending, gradient effects'
  },
  
  // Professional Designs
  'Corporate Logo': {
    filter: 'contrast(1.2) brightness(1.0) saturate(0.9)',
    backgroundColor: '#f8fafc',
    patternColor: '#1e3a8a',
    pattern: 'corporate',
    patternData: 'linear-gradient(135deg, #1e3a8a 25%, transparent 25%), linear-gradient(225deg, #1e3a8a 25%, transparent 25%), linear-gradient(45deg, #1e3a8a 25%, transparent 25%), linear-gradient(315deg, #1e3a8a 25%, transparent 25%)',
    overlayOpacity: 0.15,
    mixBlend: 'multiply',
    accentColor: '#1d4ed8',
    description: 'Brand marks, professional look'
  },
  
  'Screen Print Bold': {
    filter: 'contrast(1.4) brightness(0.9) saturate(1.3)',
    backgroundColor: '#1f2937',
    patternColor: '#f97316',
    pattern: 'bold',
    patternData: 'repeating-linear-gradient(0deg, #f97316 0px, #f97316 8px, #1f2937 8px, #1f2937 16px)',
    overlayOpacity: 0.5,
    mixBlend: 'screen',
    accentColor: '#f59e0b',
    description: 'Flash curing, bold solid colors'
  },
  
  // Traditional/Ethnic Designs
  'Paisley': {
    filter: 'contrast(1.15) brightness(0.95) saturate(1.25)',
    backgroundColor: '#faf5ff',
    patternColor: '#7c3aed',
    pattern: 'paisley',
    patternData: 'radial-gradient(ellipse at 50% 50%, #8b5cf6 0%, transparent 30%), radial-gradient(ellipse at 30% 70%, #a78bfa 0%, transparent 20%), radial-gradient(ellipse at 70% 30%, #7c3aed 0%, transparent 25%), radial-gradient(ellipse at 20% 40%, #c4b5fd 0%, transparent 15%), radial-gradient(ellipse at 80% 60%, #8b5cf6 0%, transparent 20%)',
    overlayOpacity: 0.45,
    mixBlend: 'multiply',
    accentColor: '#8b5cf6',
    description: 'Curved teardrop motifs'
  },
  
  'Block Print Traditional': {
    filter: 'sepia(0.25) contrast(1.1) brightness(0.92)',
    backgroundColor: '#fff7ed',
    patternColor: '#9a3412',
    pattern: 'block',
    patternData: 'radial-gradient(circle at 50% 50%, #9a3412 0%, transparent 40%), linear-gradient(45deg, transparent 45%, #9a3412 45%, #9a3412 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, #9a3412 45%, #9a3412 55%, transparent 55%)',
    overlayOpacity: 0.4,
    mixBlend: 'multiply',
    accentColor: '#ea580c',
    description: 'Hand-carved heritage patterns'
  },
  
  'Tribal Print': {
    filter: 'contrast(1.3) brightness(0.9) saturate(1.4)',
    backgroundColor: '#292524',
    patternColor: '#fbbf24',
    pattern: 'tribal',
    patternData: 'conic-gradient(from 0deg at 50% 50%, #fbbf24 0deg, transparent 60deg, #fbbf24 120deg, transparent 180deg, #fbbf24 240deg, transparent 300deg, #fbbf24 360deg)',
    overlayOpacity: 0.4,
    mixBlend: 'difference',
    accentColor: '#f59e0b',
    description: 'Bold contrasts, geometric shapes'
  },
  
  // Military/Utility Designs
  'Camouflage': {
    filter: 'contrast(1.15) brightness(0.85) saturate(1.1)',
    backgroundColor: '#365314',
    patternColor: '#84cc16',
    pattern: 'camo',
    patternData: 'radial-gradient(ellipse at 20% 20%, #65a30d 0%, transparent 30%), radial-gradient(ellipse at 60% 40%, #84cc16 0%, transparent 25%), radial-gradient(ellipse at 40% 70%, #365314 0%, transparent 35%), radial-gradient(ellipse at 80% 80%, #4d7c0f 0%, transparent 28%), radial-gradient(ellipse at 10% 60%, #3f6212 0%, transparent 22%)',
    overlayOpacity: 0.6,
    mixBlend: 'multiply',
    accentColor: '#65a30d',
    description: 'Blurred edges, natural tones'
  },
  
  // Texture Designs
  'Embroidered Look': {
    filter: 'contrast(1.05) brightness(1.0) saturate(0.9)',
    backgroundColor: '#f5f5f4',
    patternColor: '#78716c',
    pattern: 'embroidery',
    patternData: 'repeating-linear-gradient(45deg, #78716c 0px, #78716c 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, #a8a29e 0px, #a8a29e 1px, transparent 1px, transparent 6px)',
    overlayOpacity: 0.35,
    mixBlend: 'normal',
    accentColor: '#a8a29e',
    description: 'Raised texture simulation'
  }
});

// Preload images
if (typeof window !== 'undefined') {
  // Preload any external images if needed
}

const VirtualPreview = React.memo(({ selectedDesign, selectedMaterial }) => {
  // Get design-specific styles with fallback
  const designStyle = useMemo(() => {
    return DESIGN_STYLES[selectedDesign] || DESIGN_STYLES['Minimalist Geometric'];
  }, [selectedDesign]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 text-center">
        Visual Preview
      </h3>
      
      <div 
        className="relative w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-700"
        style={{ 
          backgroundColor: designStyle.backgroundColor,
          boxShadow: `inset 0 0 60px rgba(0,0,0,0.05)`
        }}
      >
        {/* CSS Pattern Layer */}
        <div 
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{ 
            backgroundImage: designStyle.patternData,
            backgroundColor: designStyle.backgroundColor,
            filter: designStyle.filter,
            opacity: designStyle.overlayOpacity,
            mixBlendMode: designStyle.mixBlend,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Texture Overlay for fabric effect */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{ 
            backgroundImage: `url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Gradient Overlay for Realism */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255,255,255,0.4) 0%, 
              transparent 50%, 
              rgba(0,0,0,0.08) 100%)`
          }}
        />
        
        {/* Info Badge */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg">
          <div className="text-[10px] text-white/80 font-bold uppercase tracking-wider">
            {selectedDesign}
          </div>
          <div className="text-[9px] text-white/60 font-medium">
            on {selectedMaterial}
          </div>
        </div>
        
        {/* Design Category Badge */}
        <div 
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-500"
          style={{ 
            backgroundColor: designStyle.accentColor,
            color: ['Tribal Print', 'Camouflage', 'Screen Print Bold'].includes(selectedDesign) ? '#fff' : '#000'
          }}
        >
          {selectedDesign.split(' ')[0]}
        </div>
      </div>
      
      {/* Style Info */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-slate-50 rounded-lg">
          <div className="text-[9px] text-slate-400 uppercase">Pattern</div>
          <div className="text-[8px] text-slate-600 font-medium">{designStyle.pattern}</div>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg">
          <div className="text-[9px] text-slate-400 uppercase">Blend</div>
          <div className="text-[8px] text-slate-600 font-medium">{designStyle.mixBlend}</div>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg">
          <div className="text-[9px] text-slate-400 uppercase">Opacity</div>
          <div className="text-[8px] text-slate-600 font-medium">{Math.round(designStyle.overlayOpacity * 100)}%</div>
        </div>
      </div>
    </div>
  );
});

VirtualPreview.displayName = 'VirtualPreview';

export default VirtualPreview;

// Export design styles for use in other components
export { DESIGN_STYLES };

