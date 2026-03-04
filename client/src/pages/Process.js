import React from 'react';
import { Beaker, Droplets, Waves, CheckCircle, Ship } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      title: "Technical Lab Analysis",
      desc: "Every project starts in our lab where we analyze the fabric GSM and fiber composition to determine the optimal dye recipe.",
      icon: <Beaker className="text-blue-600" size={32} />,
      tag: "PHASE 01"
    },
    {
      title: "Eco-Friendly Pre-Treatment",
      desc: "Fabrics are scoured and bleached using bio-degradable enzymes to ensure a clean surface for maximum dye absorption.",
      icon: <Waves className="text-cyan-600" size={32} />,
      tag: "PHASE 02"
    },
    {
      title: "Precision Dyeing",
      desc: "Using high-temperature, high-pressure machinery, we achieve 100% color consistency across bulk volumes.",
      icon: <Droplets className="text-indigo-600" size={32} />,
      tag: "PHASE 03"
    },
    {
      title: "Quality Assurance",
      desc: "Each batch undergoes rigorous wash-fastness and light-fastness testing to meet international ISO 9001:2026 standards.",
      icon: <CheckCircle className="text-green-600" size={32} />,
      tag: "PHASE 04"
    },
    {
      title: "Export Packaging",
      desc: "Final products are steam-pressed and vacuum-packed for international shipping to hubs in Europe and North America.",
      icon: <Ship className="text-slate-700" size={32} />,
      tag: "PHASE 05"
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">Our Industrial Process</h2>
          <p className="text-slate-500 max-w-xl mx-auto font-medium italic">
            "Where traditional textile heritage meets modern sustainable engineering."
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 items-start group">
              <div className="flex-shrink-0 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <div className="flex-grow pt-2">
                <span className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase">{step.tag}</span>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed max-w-2xl">{step.desc}</p>
                {index !== steps.length - 1 && (
                  <div className="h-12 w-px bg-slate-200 mt-8 hidden md:block"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;