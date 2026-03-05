import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Box, Layers, Info, ThumbsUp, ThumbsDown, Sparkles, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

// ============================================
// COMPREHENSIVE CLOTH MATERIAL DATABASE
// ============================================
const CLOTH_DATABASE = Object.freeze({
  // Cotton Family
  'Pure Cotton': {
    category: 'Natural',
    fiber: '100% Cotton',
    gsm: 180,
    threadCount: '40s x 40s',
    weave: 'Plain Weave',
    absorbency: 0.95, // 0-1 scale (1 = highest)
    smoothness: 0.6, // 0-1 scale (1 = smoothest)
    porosity: 0.7, // 0-1 scale (1 = high porosity)
    stiffness: 0.5,
    printCompatibility: {
      'Screen Printing': 95,
      'Digital Printing': 90,
      'Block Printing': 85,
      'Heat Transfer': 60
    },
    bestFor: ['Floral', 'Geometric', 'Abstract', 'Stripes', 'Paisley'],
    avoid: ['High-detailed logos', 'Photo-realistic'],
    characteristics: 'Excellent ink absorption, soft feel after print, vibrant colors'
  },
  
  'Organic Cotton': {
    category: 'Natural',
    fiber: '100% Organic Cotton',
    gsm: 160,
    threadCount: '30s x 30s',
    weave: 'Plain Weave',
    absorbency: 0.92,
    smoothness: 0.55,
    porosity: 0.75,
    stiffness: 0.45,
    printCompatibility: {
      'Screen Printing': 98,
      'Digital Printing': 92,
      'Block Printing': 90,
      'Heat Transfer': 55
    },
    bestFor: ['Floral', 'Abstract', 'Nature Prints', 'Organic Patterns'],
    avoid: ['Complex logos'],
    characteristics: 'Eco-friendly, excellent for earth-tone designs, natural feel'
  },
  
  'Oxford Weave': {
    category: 'Natural',
    fiber: '100% Cotton',
    gsm: 140,
    threadCount: '40s x 40s',
    weave: 'Oxford (Basketweave)',
    absorbency: 0.75,
    smoothness: 0.65,
    porosity: 0.5,
    stiffness: 0.7,
    printCompatibility: {
      'Screen Printing': 70,
      'Digital Printing': 75,
      'Block Printing': 65,
      'Heat Transfer': 80
    },
    bestFor: ['Stripes', 'Checks', 'Geometric', 'Corporate Logos'],
    avoid: ['Fine details', 'Intricate patterns'],
    characteristics: 'Textured weave shows less detail, good for bold designs'
  },
  
  'Cotton-Polyester Blend': {
    category: 'Blended',
    fiber: '60% Cotton, 40% Polyester',
    gsm: 180,
    threadCount: '35s x 35s',
    weave: 'Plain Weave',
    absorbency: 0.65,
    smoothness: 0.75,
    porosity: 0.45,
    stiffness: 0.55,
    printCompatibility: {
      'Screen Printing': 85,
      'Digital Printing': 88,
      'Block Printing': 60,
      'Heat Transfer': 95
    },
    bestFor: ['Geometric', 'Logos', 'Sports Designs', 'Bold Graphics'],
    avoid: ['Watercolor effects', 'Gradient-heavy designs'],
    characteristics: 'Durable, less ink absorption, excellent for heat transfer'
  },
  
  // Silk Family
  'Silk Satin': {
    category: 'Luxury',
    fiber: '100% Silk',
    gsm: 80,
    threadCount: '60s x 60s',
    weave: 'Satin Weave',
    absorbency: 0.45,
    smoothness: 0.95,
    porosity: 0.3,
    stiffness: 0.35,
    printCompatibility: {
      'Screen Printing': 50,
      'Digital Printing': 70,
      'Block Printing': 40,
      'Heat Transfer': 85
    },
    bestFor: ['Minimalist', 'Abstract', 'Delicate Florals', 'Luxury Logos'],
    avoid: ['Bold stripes', 'Heavy coverage designs'],
    characteristics: 'Luxurious shine, delicate ink absorption, premium finish'
  },
  
  'Raw Silk': {
    category: 'Luxury',
    fiber: '100% Silk',
    gsm: 120,
    threadCount: 'Various',
    weave: 'Plain/Rib',
    absorbency: 0.55,
    smoothness: 0.4,
    porosity: 0.6,
    stiffness: 0.65,
    printCompatibility: {
      'Screen Printing': 60,
      'Digital Printing': 65,
      'Block Printing': 55,
      'Heat Transfer': 75
    },
    bestFor: ['Traditional', 'Ethnic', 'Artistic', 'Textured Designs'],
    avoid: ['Fine lines', 'Photo prints'],
    characteristics: 'Natural texture, uneven surface affects detail'
  },
  
  // Linen Family
  'Pure Linen': {
    category: 'Natural',
    fiber: '100% Linen',
    gsm: 160,
    threadCount: '25s x 25s',
    weave: 'Plain Weave',
    absorbency: 0.98,
    smoothness: 0.35,
    porosity: 0.85,
    stiffness: 0.8,
    printCompatibility: {
      'Screen Printing': 75,
      'Digital Printing': 80,
      'Block Printing': 95,
      'Heat Transfer': 40
    },
    bestFor: ['Block Prints', 'Traditional', 'Nature', 'Artistic'],
    avoid: ['Modern geometric', 'Computer-generated designs'],
    characteristics: 'Natural texture shows through, excellent for traditional prints'
  },
  
  'Linen Blend': {
    category: 'Blended',
    fiber: '55% Linen, 45% Cotton',
    gsm: 150,
    threadCount: '30s x 30s',
    weave: 'Plain Weave',
    absorbency: 0.85,
    smoothness: 0.5,
    porosity: 0.7,
    stiffness: 0.6,
    printCompatibility: {
      'Screen Printing': 82,
      'Digital Printing': 85,
      'Block Printing': 88,
      'Heat Transfer': 55
    },
    bestFor: ['Floral', 'Traditional', 'Abstract', 'Beach Themes'],
    avoid: ['Ultra-modern designs'],
    characteristics: 'Balanced texture, versatile for various prints'
  },
  
  // Technical Fabrics
  'Twill Diagonal': {
    category: 'Technical',
    fiber: '100% Cotton',
    gsm: 220,
    threadCount: '2/20s x 10s',
    weave: 'Twill (Diagonal)',
    absorbency: 0.7,
    smoothness: 0.55,
    porosity: 0.4,
    stiffness: 0.75,
    printCompatibility: {
      'Screen Printing': 65,
      'Digital Printing': 68,
      'Block Printing': 50,
      'Heat Transfer': 72
    },
    bestFor: ['Bold Graphics', 'Workwear Designs', 'Heavy Duty Logos'],
    avoid: ['Fine details', 'Gradient designs'],
    characteristics: 'Durable weave, diagonal texture adds character'
  },
  
  'Honeycomb Pique': {
    category: 'Technical',
    fiber: '100% Cotton',
    gsm: 240,
    threadCount: '30s Combed',
    weave: 'Pique (Honeycomb)',
    absorbency: 0.5,
    smoothness: 0.45,
    porosity: 0.35,
    stiffness: 0.65,
    printCompatibility: {
      'Screen Printing': 45,
      'Digital Printing': 50,
      'Block Printing': 35,
      'Heat Transfer': 65
    },
    bestFor: ['Simple Patterns', 'Logo Placement', 'Text-Based'],
    avoid: ['Complex designs', 'Full-coverage prints'],
    characteristics: 'Textured surface limits detail, best for placement prints'
  },
  
  'Heavy Canvas': {
    category: 'Heavy Duty',
    fiber: '100% Cotton',
    gsm: 400,
    threadCount: '10s x 10s',
    weave: 'Plain Weave (Heavy)',
    absorbency: 0.6,
    smoothness: 0.2,
    porosity: 0.25,
    stiffness: 0.95,
    printCompatibility: {
      'Screen Printing': 40,
      'Digital Printing': 45,
      'Block Printing': 30,
      'Heat Transfer': 55
    },
    bestFor: ['Industrial', 'Bold Art', 'Tote Bags', 'Workwear'],
    avoid: ['Fine details', 'Photo prints', 'Delicate designs'],
    characteristics: 'Very rough texture, ink sits on surface, limited detail'
  },
  
  'Polyester Mesh': {
    category: 'Synthetic',
    fiber: '100% Polyester',
    gsm: 120,
    threadCount: 'Various',
    weave: 'Mesh',
    absorbency: 0.1,
    smoothness: 0.8,
    porosity: 0.95,
    stiffness: 0.4,
    printCompatibility: {
      'Screen Printing': 30,
      'Digital Printing': 35,
      'Block Printing': 15,
      'Heat Transfer': 98
    },
    bestFor: ['Sublimation', 'Sports Numbers', 'Simple Graphics'],
    avoid: ['Traditional prints', 'Ink-heavy designs'],
    characteristics: 'Designed for sublimation, not ideal for screen printing'
  },
  
  'Bamboo Fiber': {
    category: 'Sustainable',
    fiber: '100% Bamboo',
    gsm: 150,
    threadCount: '40s x 40s',
    weave: 'Plain Weave',
    absorbency: 0.88,
    smoothness: 0.7,
    porosity: 0.72,
    stiffness: 0.42,
    printCompatibility: {
      'Screen Printing': 90,
      'Digital Printing': 88,
      'Block Printing': 82,
      'Heat Transfer': 58
    },
    bestFor: ['Floral', 'Nature', 'Eco Themes', 'Soft Patterns'],
    avoid: ['Industrial designs'],
    characteristics: 'Silky smooth, eco-friendly, excellent print quality'
  },
  
  'Viscose Rayon': {
    category: 'Semi-Synthetic',
    fiber: '100% Viscose',
    gsm: 140,
    threadCount: '30s x 30s',
    weave: 'Plain Weave',
    absorbency: 0.82,
    smoothness: 0.78,
    porosity: 0.68,
    stiffness: 0.38,
    printCompatibility: {
      'Screen Printing': 88,
      'Digital Printing': 85,
      'Block Printing': 78,
      'Heat Transfer': 52
    },
    bestFor: ['Flowy Designs', 'Floral', 'Drapery Prints'],
    avoid: ['Stiff geometric'],
    characteristics: 'Silky drape, excellent color vibrancy'
  }
});

// ============================================
// PRINT DESIGN DATABASE
// ============================================
const PRINT_DESIGN_DATABASE = Object.freeze({
  'Minimalist Geometric': {
    category: 'Modern',
    complexity: 0.3, // 0-1 scale (1 = most complex)
    detailLevel: 'Low',
    colorDensity: 0.4,
    inkCoverage: 'Light',
    recommendedFabrics: ['Silk Satin', 'Polyester Mesh', 'Cotton-Polyester Blend'],
    designCharacteristics: 'Clean lines, simple shapes, negative space'
  },
  
  'Vintage Stripes': {
    category: 'Classic',
    complexity: 0.35,
    detailLevel: 'Low-Medium',
    colorDensity: 0.5,
    inkCoverage: 'Medium',
    recommendedFabrics: ['Oxford Weave', 'Pure Cotton', 'Organic Cotton'],
    designCharacteristics: 'Horizontal/vertical stripes, retro aesthetic'
  },
  
  'Abstract Floral': {
    category: 'Artistic',
    complexity: 0.7,
    detailLevel: 'High',
    colorDensity: 0.6,
    inkCoverage: 'Medium-Heavy',
    recommendedFabrics: ['Pure Cotton', 'Organic Cotton', 'Bamboo Fiber', 'Viscose Rayon'],
    designCharacteristics: 'Organic shapes, flowing patterns, nature-inspired'
  },
  
  'Corporate Logo': {
    category: 'Professional',
    complexity: 0.5,
    detailLevel: 'Medium',
    colorDensity: 0.75,
    inkCoverage: 'Medium',
    recommendedFabrics: ['Cotton-Polyester Blend', 'Oxford Weave', 'Pure Cotton'],
    designCharacteristics: 'Brand marks, text integration, precise details'
  },
  
  'Polka Dots': {
    category: 'Classic',
    complexity: 0.25,
    detailLevel: 'Low',
    colorDensity: 0.45,
    inkCoverage: 'Light',
    recommendedFabrics: ['Pure Cotton', 'Silk Satin', 'Linen Blend'],
    designCharacteristics: 'Repeating circular patterns, playful aesthetic'
  },
  
  'Paisley': {
    category: 'Traditional',
    complexity: 0.85,
    detailLevel: 'Very High',
    colorDensity: 0.7,
    inkCoverage: 'Heavy',
    recommendedFabrics: ['Pure Cotton', 'Silk Satin', 'Pure Linen'],
    designCharacteristics: 'Curved teardrop motifs, intricate details, dense patterns'
  },
  
  'Block Print Traditional': {
    category: 'Ethnic',
    complexity: 0.6,
    detailLevel: 'Medium-High',
    colorDensity: 0.65,
    inkCoverage: 'Medium',
    recommendedFabrics: ['Pure Linen', 'Organic Cotton', 'Cotton'],
    designCharacteristics: 'Hand-carved patterns, heritage aesthetic, bold outlines'
  },
  
  'Tie-Dye': {
    category: 'Artistic',
    complexity: 0.4,
    detailLevel: 'Low',
    colorDensity: 0.8,
    inkCoverage: 'Heavy',
    recommendedFabrics: ['Pure Cotton', 'Organic Cotton', 'Bamboo Fiber'],
    designCharacteristics: 'Color blending, gradient effects, psychedelic patterns'
  },
  
  'Camouflage': {
    category: 'Military',
    complexity: 0.55,
    detailLevel: 'Medium',
    colorDensity: 0.85,
    inkCoverage: 'Heavy',
    recommendedFabrics: ['Cotton-Polyester Blend', 'Heavy Canvas', 'Twill Diagonal'],
    designCharacteristics: 'Blurred edges, natural tones, disruptive patterns'
  },
  
  'Tribal Print': {
    category: 'Ethnic',
    complexity: 0.75,
    detailLevel: 'High',
    colorDensity: 0.7,
    inkCoverage: 'Heavy',
    recommendedFabrics: ['Pure Cotton', 'Canvas', 'Linen Blend'],
    designCharacteristics: 'Bold contrasts, geometric shapes, cultural motifs'
  },
  
  'Watercolor Effect': {
    category: 'Artistic',
    complexity: 0.8,
    detailLevel: 'Very High',
    colorDensity: 0.35,
    inkCoverage: 'Light-Medium',
    recommendedFabrics: ['Pure Cotton', 'Silk Satin', 'Viscose Rayon'],
    designCharacteristics: 'Soft blending, gradient transitions, painterly look'
  },
  
  'Photo-Realistic': {
    category: 'Modern',
    complexity: 0.95,
    detailLevel: 'Ultra High',
    colorDensity: 0.9,
    inkCoverage: 'Very Heavy',
    recommendedFabrics: ['Pure Cotton', 'Digital Printing Compatible'],
    designCharacteristics: 'Detailed images, photographs, complex imagery'
  },
  
  'Screen Print Bold': {
    category: 'Graphic',
    complexity: 0.3,
    detailLevel: 'Low',
    colorDensity: 0.95,
    inkCoverage: 'Heavy',
    recommendedFabrics: ['Cotton-Polyester Blend', 'Heavy Canvas', 'Twill Diagonal'],
    designCharacteristics: 'Flash curing, underbase, bold solid colors'
  },
  
  'Embroidered Look': {
    category: 'Texture',
    complexity: 0.65,
    detailLevel: 'High',
    colorDensity: 0.6,
    inkCoverage: 'Medium',
    recommendedFabrics: ['Cotton', 'Denim', 'Canvas'],
    designCharacteristics: 'Raised texture simulation, thread-like appearance'
  }
});

// ============================================
// REAL-TIME COMPATIBILITY ALGORITHM
// ============================================

// Convert ink coverage string to numeric value
const inkCoverageMap = {
  'Light': 0.2,
  'Medium': 0.5,
  'Heavy': 0.75,
  'Very Heavy': 0.9,
  'Light-Medium': 0.35,
  'Medium-Heavy': 0.65
};

const calculateCompatibility = (clothMaterial, printDesign) => {
  const cloth = CLOTH_DATABASE[clothMaterial];
  const design = PRINT_DESIGN_DATABASE[printDesign];
  
  if (!cloth || !design) {
    return { score: 50, factors: [], recommendation: 'Insufficient data for analysis' };
  }
  
  // Convert ink coverage to numeric
  const inkCoverageNumeric = inkCoverageMap[design.inkCoverage] || 0.5;
  
  const factors = [];
  let totalScore = 0;
  let factorCount = 0;
  
  // Factor 1: Absorbency vs Ink Coverage (25 points max)
  const absorbencyScore = (cloth.absorbency * 100) * (1 - inkCoverageNumeric);
  const absorbencyRating = absorbencyScore > 20 ? 'Excellent' : absorbencyScore > 15 ? 'Good' : absorbencyScore > 10 ? 'Fair' : 'Poor';
  factors.push({
    name: 'Ink Absorbency',
    score: Math.min(25, Math.round(absorbencyScore + 5)),
    rating: absorbencyRating,
    description: `Fabric absorbency (${Math.round(cloth.absorbency * 100)}%) vs design ink coverage (${design.inkCoverage})`,
    icon: '💧'
  });
  totalScore += Math.min(25, Math.round(absorbencyScore + 5));
  factorCount++;
  
  // Factor 2: Smoothness vs Detail Level (25 points max)
  const smoothnessRequired = (design.complexity * 0.8 + 0.2);
  const smoothnessScore = (cloth.smoothness / smoothnessRequired) * 25;
  const smoothnessRating = smoothnessScore > 20 ? 'Excellent' : smoothnessScore > 15 ? 'Good' : smoothnessScore > 10 ? 'Fair' : 'Poor';
  factors.push({
    name: 'Surface Clarity',
    score: Math.min(25, Math.round(smoothnessScore)),
    rating: smoothnessRating,
    description: `Fabric smoothness (${Math.round(cloth.smoothness * 100)}%) required for ${design.detailLevel} detail`,
    icon: '✨'
  });
  totalScore += Math.min(25, Math.round(smoothnessScore));
  factorCount++;
  
  // Factor 3: Porosity vs Complexity (25 points max)
  const porosityScore = cloth.porosity * 25 * (1 - design.complexity * 0.3);
  const porosityRating = porosityScore > 18 ? 'Excellent' : porosityScore > 14 ? 'Good' : porosityScore > 8 ? 'Fair' : 'Poor';
  factors.push({
    name: 'Ink Penetration',
    score: Math.min(25, Math.round(porosityScore + 3)),
    rating: porosityRating,
    description: `Fabric porosity (${Math.round(cloth.porosity * 100)}%) affects ${design.complexity} complexity design`,
    icon: '🔍'
  });
  totalScore += Math.min(25, Math.round(porosityScore + 3));
  factorCount++;
  
  // Factor 4: GSM vs Ink Coverage (25 points max)
  const gsmIdeal = 180; // Ideal GSM for most prints
  const gsmDeviation = Math.abs(cloth.gsm - gsmIdeal) / gsmIdeal;
  const gsmScore = Math.max(0, 25 - (gsmDeviation * 25));
  const gsmRating = gsmScore > 20 ? 'Excellent' : gsmScore > 15 ? 'Good' : gsmScore > 8 ? 'Fair' : 'Poor';
  factors.push({
    name: 'Weight Compatibility',
    score: Math.round(gsmScore),
    rating: gsmRating,
    description: `Fabric GSM (${cloth.gsm}) vs ideal (${gsmIdeal}) for optimal printing`,
    icon: '⚖️'
  });
  totalScore += Math.round(gsmScore);
  factorCount++;
  
  // Factor 5: Recommended Fabric Match (Bonus points)
  const isRecommended = design.recommendedFabrics.some(f => 
    f.toLowerCase().includes(clothMaterial.toLowerCase()) || 
    clothMaterial.toLowerCase().includes(f.toLowerCase())
  );
  if (isRecommended) {
    totalScore += 10;
    factors.push({
      name: 'Design Match',
      score: 10,
      rating: 'Perfect Match',
      description: 'This fabric is specifically recommended for this design type',
      icon: '🎯'
    });
    factorCount++;
  }
  
  // Factor 6: Category Compatibility
  const luxuryFabrics = ['Silk Satin', 'Raw Silk'];
  const naturalFabrics = ['Pure Cotton', 'Organic Cotton', 'Pure Linen', 'Linen Blend'];
  const technicalFabrics = ['Twill Diagonal', 'Heavy Canvas', 'Cotton-Polyester Blend'];
  
  let categoryBonus = 0;
  if (luxuryFabrics.includes(clothMaterial) && ['Minimalist', 'Abstract', 'Artistic'].includes(design.category)) {
    categoryBonus = 8;
  } else if (naturalFabrics.includes(clothMaterial) && ['Traditional', 'Ethnic', 'Artistic'].includes(design.category)) {
    categoryBonus = 8;
  } else if (technicalFabrics.includes(clothMaterial) && ['Graphic', 'Professional'].includes(design.category)) {
    categoryBonus = 8;
  }
  
  if (categoryBonus > 0) {
    totalScore += categoryBonus;
    factors.push({
      name: 'Style Compatibility',
      score: categoryBonus,
      rating: 'Synergy',
      description: `Fabric category matches design style category`,
      icon: '👔'
    });
    factorCount++;
  }
  
  // Final score calculation
  const finalScore = Math.min(100, Math.max(0, totalScore));
  
  // Generate recommendation
  let recommendation = '';
  if (finalScore >= 85) {
    recommendation = 'Excellent choice! This design is highly recommended for optimal print quality.';
  } else if (finalScore >= 70) {
    recommendation = 'Good compatibility. Expect professional results with standard printing methods.';
  } else if (finalScore >= 50) {
    recommendation = 'Moderate compatibility. Consider alternative designs or printing methods for better results.';
  } else {
    recommendation = 'Not recommended. This combination may result in poor print quality.';
  }
  
  // Add specific advice
  const advice = [];
  if (cloth.absorbency < 0.5 && design.inkCoverage === 'Heavy') {
    advice.push('Use heat transfer or sublimation instead of screen printing');
  }
  if (cloth.smoothness < 0.5 && design.detailLevel === 'Very High') {
    advice.push('Consider smoother fabric or simpler design for better detail');
  }
  if (cloth.gsm > 300) {
    advice.push('Heavy fabric may require specialized ink and multiple passes');
  }
  if (cloth.porosity < 0.4 && design.complexity > 0.7) {
    advice.push('Pre-treatment recommended for this fabric-design combination');
  }
  
  return {
    score: finalScore,
    factors,
    recommendation,
    advice,
    suitable: finalScore >= 50,
    printMethod: Object.entries(cloth.printCompatibility)
      .sort((a, b) => b[1] - a[1])[0][0]
  };
};

// ============================================
// GET RECOMMENDED DESIGNS FOR A FABRIC
// ============================================
const getRecommendedDesigns = (clothMaterial, currentDesign) => {
  const cloth = CLOTH_DATABASE[clothMaterial];
  if (!cloth) return [];
  
  const recommendations = Object.entries(PRINT_DESIGN_DATABASE)
    .map(([designName, design]) => {
      const compat = calculateCompatibility(clothMaterial, designName);
      return {
        name: designName,
        score: compat.score,
        category: design.category
      };
    })
    .filter(d => d.name !== currentDesign)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  
  return recommendations;
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
  
  // Real-time compatibility calculation
  const analysis = useMemo(() => {
    return calculateCompatibility(cloth, printDesign);
  }, [cloth, printDesign]);
  
  // Get recommendations
  const recommendations = useMemo(() => {
    return getRecommendedDesigns(cloth, printDesign);
  }, [cloth, printDesign]);
  
  // Simulate real-time analysis effect
  useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => setIsAnalyzing(false), 600);
    return () => clearTimeout(timer);
  }, [cloth, printDesign]);
  
  // Memoized handlers
  const handleClothChange = useCallback((e) => setCloth(e.target.value), []);
  const handlePrintDesignChange = useCallback((e) => setPrintDesign(e.target.value), []);
  
  const clothData = CLOTH_DATABASE[cloth];
  const designData = PRINT_DESIGN_DATABASE[printDesign];
  
  return (
    <div className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-4">
            <Sparkles size={14} /> Real-Time AI Analysis Engine
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight text-center uppercase">AI Design Matcher</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium">
            Intelligent fabric-design compatibility analysis based on material properties
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SELECTION PANEL */}
          <div className="lg:col-span-3 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tighter">
              <Box className="text-blue-600" size={20} /> Select Materials
            </h3>
            <div className="space-y-6">
              {/* Cloth Selection */}
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Cloth Material</label>
                <select value={cloth} onChange={handleClothChange}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all cursor-pointer">
                  {Object.keys(CLOTH_DATABASE).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              {/* Design Selection */}
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Print Design</label>
                <select value={printDesign} onChange={handlePrintDesignChange}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all cursor-pointer">
                  {Object.keys(PRINT_DESIGN_DATABASE).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              
              {/* Material Properties Card */}
              {clothData && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Material Properties</p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-slate-400">Weight</p>
                      <p className="font-black text-slate-800">{clothData.gsm} GSM</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Thread Count</p>
                      <p className="font-black text-slate-800">{clothData.threadCount}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Absorbency</p>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: `${clothData.absorbency * 100}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400">Smoothness</p>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: `${clothData.smoothness * 100}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Design Properties */}
              {designData && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Design Properties</p>
                  <div className="text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Complexity:</span>
                      <span className="font-bold text-slate-700">{designData.detailLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ink Coverage:</span>
                      <span className="font-bold text-slate-700">{designData.inkCoverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category:</span>
                      <span className="font-bold text-slate-700">{designData.category}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PREVIEW PANEL */}
          <div className="lg:col-span-5 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 text-center italic">Visual Preview</h3>
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-2xl border-4 border-white">
              {/* Base Color */}
              <div 
                className="absolute inset-0 transition-all duration-700"
                style={{ 
                  backgroundColor: clothData ? 
                    (clothData.category === 'Luxury' ? '#faf5ff' : 
                     clothData.category === 'Natural' ? '#fefefe' : 
                     clothData.category === 'Technical' ? '#f1f5f9' : '#ffffff') 
                  : '#ffffff'
                }} 
              />
              
              {/* Texture Overlay */}
              <div 
                className="absolute inset-0 opacity-30 mix-blend-multiply"
                style={{ 
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/${cloth === 'Oxford Weave' ? 'pinstriped-suit.png' : cloth === 'Heavy Canvas' ? 'canvas.png' : cloth === 'Silk Satin' ? 'silk.png' : cloth === 'Honeycomb Pique' ? 'honeycomb.png' : 'natural-paper.png'}')`,
                  backgroundSize: '200px'
                }} 
              />
              
              {/* Design Overlay */}
              <div 
                className="absolute inset-0 mix-blend-darken transition-all duration-500"
                style={{ 
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/${printDesign === 'Vintage Stripes' ? 'vertical-cloth.png' : printDesign === 'Corporate Logo' ? 'carbon-fibre.png' : printDesign === 'Polka Dots' ? 'shattered-island.png' : printDesign === 'Minimalist Geometric' ? 'cubes.png' : 'broken-noise.png'}')`, 
                  backgroundSize: printDesign === 'Vintage Stripes' ? '300px' : '150px',
                  filter: `contrast(${1 + (designData?.colorDensity || 0.5) * 0.6}) brightness(${0.9 - (designData?.colorDensity || 0.5) * 0.2})`
                }} 
              />
              
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />
              
              {/* Analysis Badge */}
              <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-black uppercase transition-all duration-500 ${
                analysis.suitable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {analysis.suitable ? 'Suitable' : 'Not Suitable'}
              </div>
            </div>
            
            {/* Print Method Suggestion */}
            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">Recommended Print Method</p>
              <p className="text-lg font-black text-blue-900">{analysis.printMethod}</p>
            </div>
          </div>

          {/* AI SCORING & ANALYSIS */}
          <div className="lg:col-span-4 bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col shadow-xl">
            {/* Score Display */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
                  <circle 
                    cx="80" cy="80" r="70" 
                    stroke="currentColor" 
                    strokeWidth="10" 
                    fill="transparent" 
                    strokeDasharray={439.8} 
                    strokeDashoffset={439.8 - (439.8 * analysis.score) / 100}
                    className={`${analysis.score > 85 ? 'text-green-500' : analysis.score > 60 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-black transition-all duration-500 ${isAnalyzing ? 'scale-110' : 'scale-100'}`}>
                    {analysis.score}%
                  </span>
                  {isAnalyzing && <RefreshCw className="w-5 h-5 animate-spin text-blue-400 mt-1" />}
                </div>
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tighter">
                {analysis.score >= 85 ? 'Excellent Match' : analysis.score >= 70 ? 'Good Match' : analysis.score >= 50 ? 'Moderate' : 'Poor Match'}
              </h4>
            </div>
            
            {/* Recommendation */}
            <div className={`p-4 rounded-2xl mb-6 ${analysis.suitable ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              <p className="text-sm font-medium">{analysis.recommendation}</p>
            </div>
            
            {/* Toggle Details */}
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-4"
            >
              <Info size={16} />
              {showDetails ? 'Hide' : 'Show'} Analysis Breakdown
              {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {/* Detailed Factors */}
            {showDetails && (
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-64">
                {analysis.factors.map((factor, idx) => (
                  <div key={idx} className="p-3 bg-white/5 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase">{factor.icon} {factor.name}</span>
                      <span className={`text-xs font-black px-2 py-1 rounded-full ${
                        factor.score >= 20 ? 'bg-green-500/20 text-green-400' :
                        factor.score >= 15 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {factor.rating}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">{factor.description}</p>
                    <div className="mt-2 w-full bg-slate-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-700 ${
                          factor.score >= 20 ? 'bg-green-500' :
                          factor.score >= 15 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} 
                        style={{width: `${factor.score * 4}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Advice */}
            {analysis.advice.length > 0 && (
              <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 mb-4">
                <p className="text-[10px] font-bold text-yellow-400 uppercase mb-2">💡 Pro Tips</p>
                <ul className="text-xs text-slate-300 space-y-1">
                  {analysis.advice.map((tip, idx) => (
                    <li key={idx}>• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Recommendations Button */}
            <button 
              onClick={() => setShowRecommendations(!showRecommendations)}
              className="mt-auto flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-sm font-bold uppercase transition-colors"
            >
              <ThumbsUp size={18} />
              Get Design Alternatives
            </button>
            
            {/* Recommended Designs */}
            {showRecommendations && recommendations.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Top Recommendations for {cloth}</p>
                {recommendations.map((rec, idx) => (
                  <button
                    key={rec.name}
                    onClick={() => setPrintDesign(rec.name)}
                    className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-between transition-colors"
                  >
                    <span className="text-xs font-medium text-slate-300">{rec.name}</span>
                    <span className={`text-xs font-black ${rec.score >= 80 ? 'text-green-400' : rec.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {rec.score}%
                    </span>
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

// Export for external use
export { CLOTH_DATABASE, PRINT_DESIGN_DATABASE, calculateCompatibility };

