// ============================================
// COMPREHENSIVE CLOTH MATERIAL DATABASE
// ============================================
export const CLOTH_DATABASE = Object.freeze({
  'Pure Cotton': {
    category: 'Natural', fiber: '100% Cotton', gsm: 180, threadCount: '40s x 40s',
    weave: 'Plain Weave', absorbency: 0.95, smoothness: 0.6, porosity: 0.7, stiffness: 0.5,
    printCompatibility: { 'Screen Printing': 95, 'Digital Printing': 90, 'Block Printing': 85, 'Heat Transfer': 60 },
    bestFor: ['Floral', 'Geometric', 'Abstract', 'Stripes', 'Paisley'],
    avoid: ['High-detailed logos', 'Photo-realistic'],
    characteristics: 'Excellent ink absorption, soft feel after print, vibrant colors'
  },
  'Organic Cotton': {
    category: 'Natural', fiber: '100% Organic Cotton', gsm: 160, threadCount: '30s x 30s',
    weave: 'Plain Weave', absorbency: 0.92, smoothness: 0.55, porosity: 0.75, stiffness: 0.45,
    printCompatibility: { 'Screen Printing': 98, 'Digital Printing': 92, 'Block Printing': 90, 'Heat Transfer': 55 },
    bestFor: ['Floral', 'Abstract', 'Nature Prints', 'Organic Patterns'], avoid: ['Complex logos'],
    characteristics: 'Eco-friendly, excellent for earth-tone designs, natural feel'
  },
  'Oxford Weave': {
    category: 'Natural', fiber: '100% Cotton', gsm: 140, threadCount: '40s x 40s',
    weave: 'Oxford (Basketweave)', absorbency: 0.75, smoothness: 0.65, porosity: 0.5, stiffness: 0.7,
    printCompatibility: { 'Screen Printing': 70, 'Digital Printing': 75, 'Block Printing': 65, 'Heat Transfer': 80 },
    bestFor: ['Stripes', 'Checks', 'Geometric', 'Corporate Logos'], avoid: ['Fine details', 'Intricate patterns'],
    characteristics: 'Textured weave shows less detail, good for bold designs'
  },
  'Cotton-Polyester Blend': {
    category: 'Blended', fiber: '60% Cotton, 40% Polyester', gsm: 180, threadCount: '35s x 35s',
    weave: 'Plain Weave', absorbency: 0.65, smoothness: 0.75, porosity: 0.45, stiffness: 0.55,
    printCompatibility: { 'Screen Printing': 85, 'Digital Printing': 88, 'Block Printing': 60, 'Heat Transfer': 95 },
    bestFor: ['Geometric', 'Logos', 'Sports Designs', 'Bold Graphics'], avoid: ['Watercolor effects', 'Gradient-heavy designs'],
    characteristics: 'Durable, less ink absorption, excellent for heat transfer'
  },
  'Silk Satin': {
    category: 'Luxury', fiber: '100% Silk', gsm: 80, threadCount: '60s x 60s',
    weave: 'Satin Weave', absorbency: 0.45, smoothness: 0.95, porosity: 0.3, stiffness: 0.35,
    printCompatibility: { 'Screen Printing': 50, 'Digital Printing': 70, 'Block Printing': 40, 'Heat Transfer': 85 },
    bestFor: ['Minimalist', 'Abstract', 'Delicate Florals', 'Luxury Logos'], avoid: ['Bold stripes', 'Heavy coverage designs'],
    characteristics: 'Luxurious shine, delicate ink absorption, premium finish'
  },
  'Raw Silk': {
    category: 'Luxury', fiber: '100% Silk', gsm: 120, threadCount: 'Various',
    weave: 'Plain/Rib', absorbency: 0.55, smoothness: 0.4, porosity: 0.6, stiffness: 0.65,
    printCompatibility: { 'Screen Printing': 60, 'Digital Printing': 65, 'Block Printing': 55, 'Heat Transfer': 75 },
    bestFor: ['Traditional', 'Ethnic', 'Artistic', 'Textured Designs'], avoid: ['Fine lines', 'Photo prints'],
    characteristics: 'Natural texture, uneven surface affects detail'
  },
  'Pure Linen': {
    category: 'Natural', fiber: '100% Linen', gsm: 160, threadCount: '25s x 25s',
    weave: 'Plain Weave', absorbency: 0.98, smoothness: 0.35, porosity: 0.85, stiffness: 0.8,
    printCompatibility: { 'Screen Printing': 75, 'Digital Printing': 80, 'Block Printing': 95, 'Heat Transfer': 40 },
    bestFor: ['Block Prints', 'Traditional', 'Nature', 'Artistic'], avoid: ['Modern geometric', 'Computer-generated designs'],
    characteristics: 'Natural texture shows through, excellent for traditional prints'
  },
  'Linen Blend': {
    category: 'Blended', fiber: '55% Linen, 45% Cotton', gsm: 150, threadCount: '30s x 30s',
    weave: 'Plain Weave', absorbency: 0.85, smoothness: 0.5, porosity: 0.7, stiffness: 0.6,
    printCompatibility: { 'Screen Printing': 82, 'Digital Printing': 85, 'Block Printing': 88, 'Heat Transfer': 55 },
    bestFor: ['Floral', 'Traditional', 'Abstract', 'Beach Themes'], avoid: ['Ultra-modern designs'],
    characteristics: 'Balanced texture, versatile for various prints'
  },
  'Twill Diagonal': {
    category: 'Technical', fiber: '100% Cotton', gsm: 220, threadCount: '2/20s x 10s',
    weave: 'Twill (Diagonal)', absorbency: 0.7, smoothness: 0.55, porosity: 0.4, stiffness: 0.75,
    printCompatibility: { 'Screen Printing': 65, 'Digital Printing': 68, 'Block Printing': 50, 'Heat Transfer': 72 },
    bestFor: ['Bold Graphics', 'Workwear Designs', 'Heavy Duty Logos'], avoid: ['Fine details', 'Gradient designs'],
    characteristics: 'Durable weave, diagonal texture adds character'
  },
  'Honeycomb Pique': {
    category: 'Technical', fiber: '100% Cotton', gsm: 240, threadCount: '30s Combed',
    weave: 'Pique (Honeycomb)', absorbency: 0.5, smoothness: 0.45, porosity: 0.35, stiffness: 0.65,
    printCompatibility: { 'Screen Printing': 45, 'Digital Printing': 50, 'Block Printing': 35, 'Heat Transfer': 65 },
    bestFor: ['Simple Patterns', 'Logo Placement', 'Text-Based'], avoid: ['Complex designs', 'Full-coverage prints'],
    characteristics: 'Textured surface limits detail, best for placement prints'
  },
  'Heavy Canvas': {
    category: 'Heavy Duty', fiber: '100% Cotton', gsm: 400, threadCount: '10s x 10s',
    weave: 'Plain Weave (Heavy)', absorbency: 0.6, smoothness: 0.2, porosity: 0.25, stiffness: 0.95,
    printCompatibility: { 'Screen Printing': 40, 'Digital Printing': 45, 'Block Printing': 30, 'Heat Transfer': 55 },
    bestFor: ['Industrial', 'Bold Art', 'Tote Bags', 'Workwear'], avoid: ['Fine details', 'Photo prints', 'Delicate designs'],
    characteristics: 'Very rough texture, ink sits on surface, limited detail'
  },
  'Polyester Mesh': {
    category: 'Synthetic', fiber: '100% Polyester', gsm: 120, threadCount: 'Various',
    weave: 'Mesh', absorbency: 0.1, smoothness: 0.8, porosity: 0.95, stiffness: 0.4,
    printCompatibility: { 'Screen Printing': 30, 'Digital Printing': 35, 'Block Printing': 15, 'Heat Transfer': 98 },
    bestFor: ['Sublimation', 'Sports Numbers', 'Simple Graphics'], avoid: ['Traditional prints', 'Ink-heavy designs'],
    characteristics: 'Designed for sublimation, not ideal for screen printing'
  },
  'Bamboo Fiber': {
    category: 'Sustainable', fiber: '100% Bamboo', gsm: 150, threadCount: '40s x 40s',
    weave: 'Plain Weave', absorbency: 0.88, smoothness: 0.7, porosity: 0.72, stiffness: 0.42,
    printCompatibility: { 'Screen Printing': 90, 'Digital Printing': 88, 'Block Printing': 82, 'Heat Transfer': 58 },
    bestFor: ['Floral', 'Nature', 'Eco Themes', 'Soft Patterns'], avoid: ['Industrial designs'],
    characteristics: 'Silky smooth, eco-friendly, excellent print quality'
  },
  'Viscose Rayon': {
    category: 'Semi-Synthetic', fiber: '100% Viscose', gsm: 140, threadCount: '30s x 30s',
    weave: 'Plain Weave', absorbency: 0.82, smoothness: 0.78, porosity: 0.68, stiffness: 0.38,
    printCompatibility: { 'Screen Printing': 88, 'Digital Printing': 85, 'Block Printing': 78, 'Heat Transfer': 52 },
    bestFor: ['Flowy Designs', 'Floral', 'Drapery Prints'], avoid: ['Stiff geometric'],
    characteristics: 'Silky drape, excellent color vibrancy'
  }
});

// ============================================
// PRINT DESIGN DATABASE
// ============================================
export const PRINT_DESIGN_DATABASE = Object.freeze({
  'Minimalist Geometric': { category: 'Modern', complexity: 0.3, detailLevel: 'Low', colorDensity: 0.4, inkCoverage: 'Light', recommendedFabrics: ['Silk Satin', 'Polyester Mesh', 'Cotton-Polyester Blend'], designCharacteristics: 'Clean lines, simple shapes, negative space' },
  'Vintage Stripes': { category: 'Classic', complexity: 0.35, detailLevel: 'Low-Medium', colorDensity: 0.5, inkCoverage: 'Medium', recommendedFabrics: ['Oxford Weave', 'Pure Cotton', 'Organic Cotton'], designCharacteristics: 'Horizontal/vertical stripes, retro aesthetic' },
  'Abstract Floral': { category: 'Artistic', complexity: 0.7, detailLevel: 'High', colorDensity: 0.6, inkCoverage: 'Medium-Heavy', recommendedFabrics: ['Pure Cotton', 'Organic Cotton', 'Bamboo Fiber', 'Viscose Rayon'], designCharacteristics: 'Organic shapes, flowing patterns, nature-inspired' },
  'Corporate Logo': { category: 'Professional', complexity: 0.5, detailLevel: 'Medium', colorDensity: 0.75, inkCoverage: 'Medium', recommendedFabrics: ['Cotton-Polyester Blend', 'Oxford Weave', 'Pure Cotton'], designCharacteristics: 'Brand marks, text integration, precise details' },
  'Polka Dots': { category: 'Classic', complexity: 0.25, detailLevel: 'Low', colorDensity: 0.45, inkCoverage: 'Light', recommendedFabrics: ['Pure Cotton', 'Silk Satin', 'Linen Blend'], designCharacteristics: 'Repeating circular patterns, playful aesthetic' },
  'Paisley': { category: 'Traditional', complexity: 0.85, detailLevel: 'Very High', colorDensity: 0.7, inkCoverage: 'Heavy', recommendedFabrics: ['Pure Cotton', 'Silk Satin', 'Pure Linen'], designCharacteristics: 'Curved teardrop motifs, intricate details, dense patterns' },
  'Block Print Traditional': { category: 'Ethnic', complexity: 0.6, detailLevel: 'Medium-High', colorDensity: 0.65, inkCoverage: 'Medium', recommendedFabrics: ['Pure Linen', 'Organic Cotton', 'Cotton'], designCharacteristics: 'Hand-carved patterns, heritage aesthetic, bold outlines' },
  'Tie-Dye': { category: 'Artistic', complexity: 0.4, detailLevel: 'Low', colorDensity: 0.8, inkCoverage: 'Heavy', recommendedFabrics: ['Pure Cotton', 'Organic Cotton', 'Bamboo Fiber'], designCharacteristics: 'Color blending, gradient effects, psychedelic patterns' },
  'Camouflage': { category: 'Military', complexity: 0.55, detailLevel: 'Medium', colorDensity: 0.85, inkCoverage: 'Heavy', recommendedFabrics: ['Cotton-Polyester Blend', 'Heavy Canvas', 'Twill Diagonal'], designCharacteristics: 'Blurred edges, natural tones, disruptive patterns' },
  'Tribal Print': { category: 'Ethnic', complexity: 0.75, detailLevel: 'High', colorDensity: 0.7, inkCoverage: 'Heavy', recommendedFabrics: ['Pure Cotton', 'Canvas', 'Linen Blend'], designCharacteristics: 'Bold contrasts, geometric shapes, cultural motifs' },
  'Watercolor Effect': { category: 'Artistic', complexity: 0.8, detailLevel: 'Very High', colorDensity: 0.35, inkCoverage: 'Light-Medium', recommendedFabrics: ['Pure Cotton', 'Silk Satin', 'Viscose Rayon'], designCharacteristics: 'Soft blending, gradient transitions, painterly look' },
  'Photo-Realistic': { category: 'Modern', complexity: 0.95, detailLevel: 'Ultra High', colorDensity: 0.9, inkCoverage: 'Very Heavy', recommendedFabrics: ['Pure Cotton', 'Digital Printing Compatible'], designCharacteristics: 'Detailed images, photographs, complex imagery' },
  'Screen Print Bold': { category: 'Graphic', complexity: 0.3, detailLevel: 'Low', colorDensity: 0.95, inkCoverage: 'Heavy', recommendedFabrics: ['Cotton-Polyester Blend', 'Heavy Canvas', 'Twill Diagonal'], designCharacteristics: 'Flash curing, underbase, bold solid colors' },
  'Embroidered Look': { category: 'Texture', complexity: 0.65, detailLevel: 'High', colorDensity: 0.6, inkCoverage: 'Medium', recommendedFabrics: ['Cotton', 'Denim', 'Canvas'], designCharacteristics: 'Raised texture simulation, thread-like appearance' }
});

// ============================================
// DESIGN VISUAL STYLES WITH CSS PATTERNS
// ============================================
export const DESIGN_STYLES = Object.freeze({
  'Minimalist Geometric': {
    backgroundColor: '#f8fafc', patternColor: '#1e293b', pattern: 'geometric',
    patternData: 'repeating-linear-gradient(45deg, #1e293b 0px, #1e293b 2px, transparent 2px, transparent 20px)',
    overlayOpacity: 0.2, mixBlend: 'multiply', accentColor: '#3b82f6', description: 'Clean diagonal lines'
  },
  'Photo-Realistic': {
    backgroundColor: '#f1f5f9', patternColor: '#64748b', pattern: 'photo',
    patternData: 'radial-gradient(circle at 25% 25%, #64748b 2px, transparent 2px), radial-gradient(circle at 75% 75%, #475569 2px, transparent 2px)',
    overlayOpacity: 0.25, mixBlend: 'normal', accentColor: '#8b5cf6', description: 'Detailed imagery'
  },
  'Vintage Stripes': {
    backgroundColor: '#fef3c7', patternColor: '#92400e', pattern: 'stripes',
    patternData: 'repeating-linear-gradient(90deg, #92400e 0px, #92400e 4px, #fef3c7 4px, #fef3c7 20px)',
    overlayOpacity: 0.4, mixBlend: 'multiply', accentColor: '#d97706', description: 'Horizontal stripes'
  },
  'Polka Dots': {
    backgroundColor: '#fdf4ff', patternColor: '#be185d', pattern: 'dots',
    patternData: 'radial-gradient(circle, #be185d 8px, transparent 8px)',
    overlayOpacity: 0.35, mixBlend: 'multiply', accentColor: '#db2777', description: 'Circular dots pattern'
  },
  'Abstract Floral': {
    backgroundColor: '#fdf2f8', patternColor: '#ec4899', pattern: 'floral',
    patternData: 'radial-gradient(ellipse at 50% 50%, #ec4899 0px, transparent 50%), radial-gradient(ellipse at 20% 80%, #f472b6 0px, transparent 30%), radial-gradient(ellipse at 80% 20%, #db2777 0px, transparent 30%)',
    overlayOpacity: 0.45, mixBlend: 'multiply', accentColor: '#ec4899', description: 'Organic floral shapes'
  },
  'Watercolor Effect': {
    backgroundColor: '#f0fdfa', patternColor: '#14b8a6', pattern: 'watercolor',
    patternData: 'radial-gradient(ellipse at 30% 30%, rgba(20, 184, 166, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(45, 212, 191, 0.25) 0%, transparent 40%), radial-gradient(ellipse at 50% 80%, rgba(20, 184, 166, 0.2) 0%, transparent 45%)',
    overlayOpacity: 0.5, mixBlend: 'soft-light', accentColor: '#14b8a6', description: 'Soft watercolor blends'
  },
  'Tie-Dye': {
    backgroundColor: '#fef2f2', patternColor: '#ef4444', pattern: 'tiedye',
    patternData: 'radial-gradient(circle at 50% 0%, #ef4444 0%, transparent 50%), radial-gradient(circle at 100% 50%, #f87171 0%, transparent 40%), radial-gradient(circle at 50% 100%, #dc2626 0%, transparent 50%), radial-gradient(circle at 0% 50%, #fca5a5 0%, transparent 40%)',
    overlayOpacity: 0.55, mixBlend: 'color-burn', accentColor: '#ef4444', description: 'Tie-dye swirl effect'
  },
  'Corporate Logo': {
    backgroundColor: '#f8fafc', patternColor: '#1e3a8a', pattern: 'corporate',
    patternData: 'linear-gradient(135deg, #1e3a8a 25%, transparent 25%), linear-gradient(225deg, #1e3a8a 25%, transparent 25%), linear-gradient(45deg, #1e3a8a 25%, transparent 25%), linear-gradient(315deg, #1e3a8a 25%, transparent 25%)',
    overlayOpacity: 0.15, mixBlend: 'multiply', accentColor: '#1d4ed8', description: 'Professional diamond'
  },
  'Screen Print Bold': {
    backgroundColor: '#1f2937', patternColor: '#f97316', pattern: 'bold',
    patternData: 'repeating-linear-gradient(0deg, #f97316 0px, #f97316 8px, #1f2937 8px, #1f2937 16px)',
    overlayOpacity: 0.5, mixBlend: 'screen', accentColor: '#f59e0b', description: 'Bold horizontal lines'
  },
  'Paisley': {
    backgroundColor: '#faf5ff', patternColor: '#8b5cf6', pattern: 'paisley',
    patternData: 'radial-gradient(ellipse at 50% 50%, #8b5cf6 0%, transparent 30%), radial-gradient(ellipse at 30% 70%, #a78bfa 0%, transparent 20%), radial-gradient(ellipse at 70% 30%, #7c3aed 0%, transparent 25%)',
    overlayOpacity: 0.45, mixBlend: 'multiply', accentColor: '#8b5cf6', description: 'Curved teardrop shapes'
  },
  'Block Print Traditional': {
    backgroundColor: '#fff7ed', patternColor: '#9a3412', pattern: 'block',
    patternData: 'radial-gradient(circle at 50% 50%, #9a3412 0%, transparent 40%), linear-gradient(45deg, transparent 45%, #9a3412 45%, #9a3412 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, #9a3412 45%, #9a3412 55%, transparent 55%)',
    overlayOpacity: 0.4, mixBlend: 'multiply', accentColor: '#ea580c', description: 'Traditional block print'
  },
  'Tribal Print': {
    backgroundColor: '#292524', patternColor: '#fbbf24', pattern: 'tribal',
    patternData: 'conic-gradient(from 0deg at 50% 50%, #fbbf24 0deg, transparent 60deg, #fbbf24 120deg, transparent 180deg, #fbbf24 240deg, transparent 300deg, #fbbf24 360deg)',
    overlayOpacity: 0.4, mixBlend: 'difference', accentColor: '#f59e0b', description: 'Geometric tribal'
  },
  'Camouflage': {
    backgroundColor: '#365314', patternColor: '#84cc16', pattern: 'camo',
    patternData: 'radial-gradient(ellipse at 20% 20%, #65a30d 0%, transparent 30%), radial-gradient(ellipse at 60% 40%, #84cc16 0%, transparent 25%), radial-gradient(ellipse at 40% 70%, #365314 0%, transparent 35%), radial-gradient(ellipse at 80% 80%, #4d7c0f 0%, transparent 28%)',
    overlayOpacity: 0.6, mixBlend: 'multiply', accentColor: '#65a30d', description: 'Military camo effect'
  },
  'Embroidered Look': {
    backgroundColor: '#f5f5f4', patternColor: '#78716c', pattern: 'embroidery',
    patternData: 'repeating-linear-gradient(45deg, #78716c 0px, #78716c 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, #a8a29e 0px, #a8a29e 1px, transparent 1px, transparent 6px)',
    overlayOpacity: 0.35, mixBlend: 'normal', accentColor: '#a8a29e', description: 'Crosshatch texture'
  }
});
