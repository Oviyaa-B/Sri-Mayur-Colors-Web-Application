import React from 'react';

const VirtualPreview = ({ selectedDesign, selectedMaterial }) => {
  // Mapping the design names to actual texture images or CSS filters
  const textureStyles = {
    'Polished Metal': 'grayscale(0.5) brightness(1.2) contrast(1.5)',
    'Rough Concrete': 'sepia(0.3) contrast(1.2) brightness(0.9)',
    'Smooth Marble': 'opacity(0.8) contrast(1.1)',
    'Rusted Metal': 'hue-rotate(15deg) contrast(1.4) saturate(1.5)'
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 text-center">
        3D Texture Preview
      </h3>
      
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
        {/* The Base Fabric Mockup */}
        <img 
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80" 
          alt="Fabric Mockup"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        {/* The AI-Generated Texture Overlay */}
        <div 
          className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out mix-blend-multiply"
          style={{ 
            backgroundImage: `url('https://www.transparenttextures.com/patterns/dark-leather.png')`, // Example texture overlay
            filter: textureStyles[selectedDesign] || 'none',
            backgroundColor: selectedMaterial.includes('Linen') ? '#f3e5ab' : '#ffffff' 
          }}
        />
        
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white font-bold uppercase tracking-wider">
          Live Render: {selectedDesign} on {selectedMaterial}
        </div>
      </div>
    </div>
  );
};

export default VirtualPreview;