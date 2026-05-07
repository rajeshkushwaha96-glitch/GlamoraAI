import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TOOLS, PLANS } from '../constants';
import ToolCard from '../components/ToolCard';
import ImageCompare from '../components/ImageCompare';
import { 
  Upload, Wand2, Sparkles, Smile, Globe, LockOpen, Check, 
  ArrowRight, Plus, Minus, Zap, Crown, Star, Eye, Palette,
  Users, CheckCircle2, Image as ImageIcon, ShieldCheck
} from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      className={`mb-4 rounded-3xl overflow-hidden border transition-all duration-500 ${
        isOpen 
          ? 'bg-white/10 border-purple-500/30 shadow-[0_20px_40px_rgba(123,47,247,0.15)]' 
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
      } backdrop-blur-xl`}
    >
      <button 
        className="w-full p-6 md:p-8 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
            isOpen ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white' : 'bg-white/10 text-white/40'
          }`}>
            <Sparkles size={18} />
          </div>
          <span className={`text-lg md:text-xl font-black tracking-tight transition-colors duration-500 ${
            isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'
          }`}>
            {question}
          </span>
        </div>
        <div className={`transition-all duration-500 p-2 rounded-full ${
          isOpen ? 'rotate-180 bg-white/10 text-white' : 'text-white/30 group-hover:text-white'
        }`}>
          <Plus size={20} className={`transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} />
        </div>
      </button>
      
      <motion.div 
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="overflow-hidden"
      >
        <div className="px-6 md:px-8 pb-8 pt-0 ml-15">
          <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  // Filter for specific beauty tools as requested
  const popularToolIds = [
    'selfie-glow', 
    'bridal-glam', 
    'hair-color', 
    'eye-color', 
    'makeup', 
    'face-smooth', 
    'beauty-filters', 
    'profile-picture'
  ];
  
  const popularTools = TOOLS.filter(t => popularToolIds.includes(t.id));

  const galleryItems = [
    {
      title: "Skin Perfection",
      subtitle: "Smooth texture & blemish removal",
      before: "https://picsum.photos/seed/face1/800/800?grayscale=1&blur=1",
      after: "https://picsum.photos/seed/face1/800/800",
      badge: "AI Smooth ✨"
    },
    {
      title: "Glow Enhancement",
      subtitle: "Natural radiance & lighting",
      before: "https://picsum.photos/seed/face2/800/800?brightness=0.7&contrast=0.9",
      after: "https://picsum.photos/seed/face2/800/800",
      badge: "AI Glow ✨"
    },
    {
      title: "Portrait Retouch",
      subtitle: "Professional studio finish",
      before: "https://picsum.photos/seed/face3/800/800?blur=2",
      after: "https://picsum.photos/seed/face3/800/800",
      badge: "AI Studio ✨"
    },
    {
      title: "Feature Definition",
      subtitle: "Sharpen & define details",
      before: "https://picsum.photos/seed/face4/800/800?grayscale=1",
      after: "https://picsum.photos/seed/face4/800/800",
      badge: "AI HD ✨"
    }
  ];

  const faqs = [
    {
      question: "Is it free to use?",
      answer: "Yes, many tools are free to use. Premium features unlock HD exports, faster processing, and advanced filters."
    },
    {
      question: "Are my photos private?",
      answer: "Absolutely. Your images are processed securely and never stored or shared."
    },
    {
      question: "Do you add any watermark on images?",
      answer: "Free exports may have a small watermark. Pro & Power plans remove all watermarks."
    },
    {
      question: "Do I need to install an app?",
      answer: "No app needed. Everything works directly in your browser — mobile or desktop."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      
      {/* 1) HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40 bg-gradient-to-br from-[#ff4ecd] to-[#7b2ff7] text-white">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Centered Brand Name */}
          <div className="flex justify-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative inline-block group animate-float"
            >
              {/* Soft Gradient Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-[40px] rounded-full animate-soft-glow"></div>
              
              {/* Background Glow Blobs */}
              <div className="absolute -inset-20 bg-pink-500/10 blur-[100px] rounded-full animate-pulse"></div>
              <div className="absolute -inset-20 bg-purple-500/10 blur-[100px] rounded-full animate-pulse animation-delay-1000"></div>
              
              {/* Glowing Particles */}
              <div className="absolute -top-6 left-1/4 w-2 h-2 bg-pink-300 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute top-1/2 -right-6 w-3 h-3 bg-purple-300 rounded-full blur-md animate-pulse animation-delay-1000"></div>
              <div className="absolute -bottom-6 left-1/2 w-2 h-2 bg-blue-300 rounded-full blur-sm animate-pulse animation-delay-2000"></div>
              <div className="absolute top-1/4 -left-8 w-1.5 h-1.5 bg-pink-200 rounded-full blur-sm animate-pulse animation-delay-1500"></div>

              {/* Sparkles - Enhanced and more elegant */}
              <div className="absolute -top-10 -left-10 text-pink-200/60 animate-shimmer">
                <Sparkles size={32} />
              </div>
              <div className="absolute -bottom-10 -right-10 text-purple-200/60 animate-shimmer animation-delay-1000">
                <Sparkles size={28} />
              </div>
              <div className="absolute top-0 -right-12 text-blue-200/40 animate-shimmer animation-delay-2000">
                <Sparkles size={20} />
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 animate-gradient-text relative overflow-hidden px-12 py-6 drop-shadow-[0_0_40px_rgba(255,255,255,0.25)] group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-1000 text-center">
                Glamora AI
                <div className="reflection-sweep opacity-40"></div>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in opacity-0">
                <Sparkles size={14} className="text-pink-200" /> NEW AI ENGINE 2.5
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-8 animate-fade-in opacity-0 animation-delay-200">
                Transform Your Photos into Stunning <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200">AI Masterpieces ✨</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-medium animate-fade-in opacity-0 animation-delay-400">
                Enhance, retouch, and restyle your photos instantly using powerful AI tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in opacity-0 animation-delay-600">
                <a 
                  href="#tools" 
                  className="group relative inline-flex justify-center items-center px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_10px_30px_rgba(236,72,153,0.3)] hover:shadow-[0_20px_50px_rgba(236,72,153,0.5)] overflow-hidden"
                >
                  <span className="relative z-10">Start Editing Free</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -inset-4 bg-white/20 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                </a>
                <a 
                  href="#tools" 
                  className="inline-flex justify-center items-center px-10 py-5 bg-white/5 backdrop-blur-md text-white border-2 border-white/20 rounded-full font-black text-xl hover:bg-white/10 transition-all hover:scale-105 hover:border-white/40"
                >
                  Explore Tools
                </a>
              </div>
            </div>

            {/* Right Visual (Compare Slider) */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-full animate-fade-in opacity-0 animation-delay-400">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/20 aspect-[4/5] md:aspect-[1/1] bg-white/5 backdrop-blur-sm">
                <ImageCompare 
                  beforeImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800&sat=-20"
                  afterImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800&sat=10&con=10"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]"></div>
                  <span className="text-sm font-black text-white tracking-wide">AI ENHANCED</span>
                </div>
              </div>
              
              {/* Decorator Elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-400/20 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 2) TRUST / SOCIAL PROOF SECTION */}
      <section className="relative z-20 border-y border-purple-100 bg-gradient-to-b from-purple-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-black shadow-sm border border-pink-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </span>
                New & Growing Platform 🚀
              </div>
            </div>
            <p className="text-purple-950/40 text-sm uppercase tracking-[0.4em] font-black">
              Built for creators, influencers, and everyday users
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {[
              { icon: <Users size={32} />, label: "Built for creators & everyday users", value: "Community", color: "text-pink-600", bg: "bg-pink-50" },
              { icon: <Sparkles size={32} />, label: "Powered by advanced AI technology", value: "AI Powered", color: "text-purple-600", bg: "bg-purple-50" },
              { icon: <Wand2 size={32} />, label: "20+ AI tools available", value: "20+ Tools", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: <ShieldCheck size={32} />, label: "Fast, secure, and private", value: "Private", color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="flex flex-col items-center p-8 bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-purple-100/50 group hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-500"
              >
                <div className={`${stat.color} ${stat.bg} mb-6 p-5 rounded-3xl group-hover:scale-110 transition-transform duration-500`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-purple-950 mb-3 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-purple-900/50 text-xs font-bold leading-relaxed max-w-[160px]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm font-bold text-purple-950/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span>No signup required for basic tools</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span>Your photos are processed securely</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5) TRANSFORMATION GALLERY SECTION */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-purple-50/20 to-pink-50/20 relative overflow-hidden border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-purple-200"
            >
              <Sparkles size={12} className="fill-purple-600" />
              Transformation Gallery
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
              See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Magic in Action</span> ✨
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Real AI transformations in seconds. Professional editing made accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group relative"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-500 font-bold text-sm">{item.subtitle}</p>
                </div>
                
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-purple-200/50 border border-white/50 group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                  <ImageCompare 
                    beforeImage={item.before}
                    afterImage={item.after}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <a 
                href="#tools"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-12 py-5 rounded-full bg-[#1a0f2e] text-white font-black text-xl hover:bg-purple-900 transition-all group shadow-2xl hover:shadow-purple-500/20"
              >
                Try It Yourself <ArrowRight size={22} className="ml-3 transition-transform group-hover:translate-x-3" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3) POPULAR TOOLS SECTION */}
      <section id="tools" className="py-24 lg:py-36 bg-gradient-to-b from-[#1a0f2e] via-[#0f0f1a] to-[#2a0f3f] relative overflow-hidden">
        {/* Visual Depth: Glowing Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300 text-xs font-black uppercase tracking-[0.2em] mb-6">
              Curated Selection
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
              Popular AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Beauty & Photo Tools</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed">
              Professional editing made simple. Choose a tool and transform your photos instantly with studio-quality results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {popularTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="mt-20 text-center">
             <Link to="/tools" className="inline-flex items-center px-12 py-4 rounded-full bg-white text-[#1a0f2e] font-black text-lg hover:bg-pink-50 transition-all group shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
               Explore All 20+ Tools <ArrowRight size={20} className="ml-3 transition-transform group-hover:translate-x-3" />
             </Link>
          </div>
        </div>
      </section>

      {/* 4) SHOWCASE SECTION */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-pink-200/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-black uppercase tracking-[0.2em] mb-6">
                AI Precision
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
                See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Beauty Magic</span> in One Click
              </h2>
              <p className="text-xl text-slate-600 mb-16 leading-relaxed font-medium max-w-2xl mx-auto">
                Our AI analyzes your facial features to provide realistic, studio-quality enhancements — subtle, clean, and natural.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center gap-6 group cursor-default p-8 rounded-3xl bg-white/50 border border-white/50 backdrop-blur-sm shadow-xl shadow-pink-100/20"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-xl mb-3">Skin Perfection</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Automatically fix acne, scars, texture, and uneven tone with pixel-perfect accuracy.</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center gap-6 group cursor-default p-8 rounded-3xl bg-white/50 border border-white/50 backdrop-blur-sm shadow-xl shadow-blue-100/20"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                    <Eye size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-xl mb-3">Brighten Eyes</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Enhance your smile and bring life to your eyes for that perfect studio portrait look.</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center gap-6 group cursor-default p-8 rounded-3xl bg-white/50 border border-white/50 backdrop-blur-sm shadow-xl shadow-purple-100/20"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
                    <Palette size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-xl mb-3">Natural Makeup</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Apply soft glam, bridal looks, or natural daily makeup instantly with AI-driven blending.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5) PRICING SECTION */}
      <section className="py-24 lg:py-36 bg-gradient-to-b from-[#2a0f3f] to-[#0f0f1a] relative overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-black uppercase tracking-[0.2em] mb-6">
              Flexible Plans
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
              Simple Pricing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">Everyone</span>
            </h2>
            <p className="text-xl text-white/60 font-medium">
              Choose the perfect plan for your creative journey. Upgrade or downgrade anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-[2.5rem] backdrop-blur-3xl border transition-all duration-500 flex flex-col h-full ${
                  plan.popular 
                    ? 'bg-white/[0.12] border-purple-500/50 shadow-[0_40px_80px_rgba(123,47,247,0.3)] md:scale-110 z-20' 
                    : 'bg-white/[0.06] border-white/10 shadow-2xl z-10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                    plan.name === 'Free' ? 'bg-slate-800 text-slate-400' :
                    plan.name === 'Pro' ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white' :
                    'bg-gradient-to-br from-amber-400 to-orange-600 text-white'
                  }`}>
                    {plan.name === 'Free' ? <Globe size={28} /> :
                     plan.name === 'Pro' ? <Star size={28} /> :
                     <Crown size={28} />}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    {plan.period && <span className="text-white/50 font-medium">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-white/70 text-sm font-medium">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular ? 'bg-purple-500/20 text-purple-300' : 'bg-white/10 text-white/40'
                      }`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  to={plan.name === 'Free' ? '/signup' : '/pricing'} 
                  className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-center transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-white text-[#1a0f2e] hover:bg-pink-50 shadow-xl' 
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/pricing" className="inline-flex items-center text-white/50 hover:text-white font-bold transition-colors group">
              View Comparison Table <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6) FAQ SECTION */}
      <section className="py-24 lg:py-36 bg-[#0f0f1a] relative overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300 text-xs font-black uppercase tracking-[0.2em] mb-6">
              Support
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">Questions</span>
            </h2>
            <p className="text-xl text-white/60 font-medium">
              Everything you need to know about Glamora AI.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* 7) FINAL CTA SECTION */}
      <section className="py-20 bg-slate-900 text-white text-center">
         <div className="max-w-4xl mx-auto px-4">
           <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to glow up your photos?</h2>
           <Link to="/signup" className="inline-block px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors mb-4">
             Get Started Now
           </Link>
           <p className="text-slate-400 text-sm">No signup needed for basic tools. Upload and edit instantly.</p>
         </div>
      </section>

    </div>
  );
};

export default Home;