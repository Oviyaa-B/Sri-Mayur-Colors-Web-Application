import React, { useState } from 'react';
import { Send, ClipboardList, ShieldCheck, Globe } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ImpactCounter from '../components/ImpactCounter';
import { inquiryService } from '../services/api';
import { FABRIC_TYPES } from '../config/constants';

const BulkInquiry = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    fabricType: FABRIC_TYPES[0].value,
    quantity: '', // Stored as string to handle empty input state
    specifications: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await inquiryService.createInquiry(formData);
      alert(response.message || 'Inquiry submitted successfully!'); 
      setFormData({ 
        companyName: '', 
        country: '', 
        fabricType: FABRIC_TYPES[0].value, 
        quantity: '', 
        specifications: '' 
      });
    } catch (err) {
      console.error(err);
      alert(err.message || 'Submission failed. Ensure the MongoDB server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Globe size={14} /> Tier-1 Export Sourcing
            </div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Global Bulk Inquiry</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium">
              Submit technical requirements for GOTS-certified sustainable production.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: The Inquiry Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                <ClipboardList className="text-blue-600" size={24} />
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">Project Specifications</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Company Identity</label>
                  <input 
                    type="text" placeholder="e.g. Nordic Apparel Group" required 
                    className="p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})} value={formData.companyName}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Country of Origin</label>
                  <input 
                    type="text" placeholder="e.g. Sweden" required 
                    className="p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, country: e.target.value})} value={formData.country}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Fabric Selection</label>
                  <select 
                    className="p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none transition-all cursor-pointer"
                    onChange={(e) => setFormData({...formData, fabricType: e.target.value})} value={formData.fabricType}
                  >
                    {FABRIC_TYPES.map(fabric => (
                      <option key={fabric.value} value={fabric.value}>{fabric.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Order Volume (Kgs)</label>
                  <input 
                    type="number" placeholder="Enter quantity" required 
                    className="p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})} value={formData.quantity}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Technical Requirements (Pantone, GSM, AI Score)</label>
                  <textarea 
                    placeholder="Provide details on dyeing requirements and quality standards" 
                    className="p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none transition-all h-32 resize-none"
                    onChange={(e) => setFormData({...formData, specifications: e.target.value})} value={formData.specifications}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="md:col-span-2 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : `Submit Production Inquiry`} <Send size={18} />
                </button>
              </div>
            </form>

            {/* Right Column: AI Analysis & Impact */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Sustainability Impact Component - FIXED: Pass as Number */}
              <ImpactCounter quantity={Number(formData.quantity) || 0} />

              {/* Compliance Card */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-green-600" size={22} />
                  <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Compliance Assurance</h4>
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                  All inquiries cross-referenced with REACH and GOTS standards. Our AI model analyzes specifications for feasibility.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['ISO 9001', 'GOTS', 'REACH', 'ZLD Facility'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 text-[9px] font-black text-slate-400 rounded-full border border-slate-100 tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default BulkInquiry;