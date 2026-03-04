import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, ShieldCheck, Zap, ArrowRight, LayoutDashboard, Award } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Home = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        {/* HERO: The Authority Section */}
        <section className="pt-48 pb-32 px-6 bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -mr-40 -mt-40" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10 border border-blue-500/20">
                <Globe size={14} /> Tier-1 Export Authority
              </div>
              <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-10">
                Sustainable <br /><span className="text-blue-500 underline underline-offset-[12px] decoration-blue-500/30">Intelligence.</span>
              </h1>
              <p className="max-w-md text-slate-400 text-lg font-medium leading-relaxed mb-14">
                Redefining textile production through AI-driven design verification and zero-impact dyeing chemistry.
              </p>
              <div className="flex gap-6">
                <Link to="/bulk" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-white hover:text-slate-900 transition-all shadow-2xl shadow-blue-600/20">
                  Bulk Enquiry<Sparkles size={18} />
                </Link>
              </div>
            </div>
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border border-white/10">
              <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000" alt="Industrial Textile" className="w-full h-full object-cover aspect-square" />
            </div>
          </div>
        </section>

        {/* TRUST BANNER */}
        <section className="py-14 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all">
            <TrustItem icon={<Award size={18}/>} text="ISO 9001:2015" />
            <TrustItem icon={<ShieldCheck size={18}/>} text="REACH COMPLIANT" />
            <TrustItem icon={<Zap size={18}/>} text="GOTS CERTIFIED" />
            <TrustItem icon={<Globe size={18}/>} text="GLOBAL EXPORTS" />
          </div>
        </section>

        {/* BENTO GRID: Functional Integration */}
        <section className="py-32 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8">
            <Link to="/matcher" className="md:col-span-8 bg-white p-14 rounded-[4rem] border border-slate-200 shadow-sm group hover:border-blue-500 transition-all flex flex-col justify-between">
              <div>
                <h4 className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-6">Simulation Engine</h4>
                <h3 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-8">AI Print Verification.</h3>
                <p className="text-slate-500 text-lg font-medium max-w-lg">Predict ink clarity across 7+ professional cloth weaves with 98% industrial accuracy before mass production.</p>
              </div>
              <div className="mt-12 inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-blue-600">Start Verification <ArrowRight size={14} /></div>
            </Link>

            <Link to="/admin/dashboard" className="md:col-span-4 bg-slate-900 p-14 rounded-[4rem] text-white flex flex-col justify-between group">
              <LayoutDashboard className="text-blue-500" size={48} />
              <div>
                <h3 className="text-3xl font-bold tracking-tighter uppercase mb-4">Live Dashboard</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Full lifecycle transparency for international logistics teams.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

const TrustItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 font-black text-slate-900 text-[10px] uppercase tracking-widest">
    {icon} {text}
  </div>
);

export default Home;