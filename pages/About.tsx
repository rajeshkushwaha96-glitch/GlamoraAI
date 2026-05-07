import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Check, Zap, ShieldCheck, Smile, 
  Wand2, Globe, Layout, Cpu, MousePointer2, 
  ArrowRight, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const trustPoints = [
    { icon: <MousePointer2 size={18} />, text: "No skills needed" },
    { icon: <Zap size={18} />, text: "Instant results" },
    { icon: <Cpu size={18} />, text: "Powered by AI" }
  ];

  const offerings = [
    {
      title: "20+ Smart AI Tools",
      description: "Background removal, face retouch, color grading, makeup enhancement, upscaling, and more.",
      icon: <Wand2 size={24} />,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Instant Results",
      description: "Upload → Click → Done. Professional editing in seconds.",
      icon: <Zap size={24} />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Studio-Quality Portraits",
      description: "Ready for social media, resumes, and professional portfolios.",
      icon: <Star size={24} />,
      color: "from-purple-500 to-violet-600"
    },
    {
      title: "Browser-Based",
      description: "Works seamlessly on all devices — mobile, tablet, or desktop.",
      icon: <Globe size={24} />,
      color: "from-emerald-400 to-teal-600"
    },
    {
      title: "Privacy First",
      description: "Your photos are processed securely and never shared or stored.",
      icon: <ShieldCheck size={24} />,
      color: "from-amber-400 to-orange-600"
    },
    {
      title: "Modern UI",
      description: "Clean, intuitive interface designed for maximum creativity.",
      icon: <Layout size={24} />,
      color: "from-cyan-400 to-blue-500"
    }
  ];

  return (
    <div className="bg-[#0f0f1a] min-h-screen relative overflow-hidden font-sans text-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        
        {/* 1, 2, 3, 4, 5, 6, 7) HERO / ABOUT SECTION (SPLIT LAYOUT) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300 text-xs font-black uppercase tracking-[0.2em] mb-6">
              Our Story
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">Glamora AI</span>
            </h1>
            
            <div className="space-y-6 text-xl text-white/70 font-medium leading-relaxed mb-10">
              <p>
                Glamora AI is designed to make photo editing effortless for everyone — no apps to install, no learning curve, and no expensive software.
              </p>
              <p>
                Our mission is simple: <span className="text-white font-bold underline decoration-pink-500/50 underline-offset-4">bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">professional-quality editing</span> to anyone with just one click.</span>
              </p>
              <p>
                Whether you're improving selfies, polishing portraits, preparing professional profile photos, or creating artistic looks — AI handles all the hard work for you.
              </p>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap gap-6 mb-12">
              {trustPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-pink-400">
                    {point.icon}
                  </div>
                  {point.text}
                </div>
              ))}
            </div>

            <Link to="/tools" className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-black text-lg hover:scale-105 transition-all shadow-lg shadow-purple-500/20 group">
              Start Creating <ArrowRight size={20} className="ml-3 transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 blur-3xl rounded-full scale-110 animate-pulse"></div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] ring-1 ring-white/20 aspect-[4/5] bg-white/5 backdrop-blur-sm p-4 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                alt="AI Editing Preview"
                className="w-full h-full object-cover rounded-[1.5rem]"
                referrerPolicy="no-referrer"
              />
              {/* Floating UI Elements */}
              <div className="absolute top-12 -right-6 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl animate-float animation-delay-1000">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <Check size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white uppercase tracking-wider">Skin Smoothed</p>
                    <p className="text-[10px] text-white/50">AI Precision: 99.8%</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-12 -left-6 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl animate-float animation-delay-2000">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white uppercase tracking-wider">Glow Applied</p>
                    <p className="text-[10px] text-white/50">Studio Lighting Active</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 8) WHAT WE OFFER (MODERN CARDS) */}
        <section className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-black uppercase tracking-[0.2em] mb-6">
              Our Capabilities
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">Offer</span>
            </h2>
            <p className="text-xl text-white/60 font-medium">
              Professional tools designed for everyone, from hobbyists to creative professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 51, 52, 53, 54, 55, 56, 57) OUR VISION */}
        <section className="text-center py-24 px-4 rounded-[3rem] bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/10 backdrop-blur-md mb-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(123,47,247,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Our Vision</h2>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
              We believe powerful photo editing should be <span className="text-white font-bold">fast, accessible, and fun.</span> Glamora AI combines advanced AI with a simple UI to help anyone transform photos into stunning visuals.
            </p>
          </div>
        </section>

        {/* 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75) WHY CHOOSE US */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">Why Choose Us</h2>
              <div className="grid gap-4">
                {[
                  "No signup needed to try tools",
                  "Super fast AI processing",
                  "Beginner-friendly interface",
                  "Built for creators & professionals"
                ].map((text, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <span className="text-white/80 font-bold">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] p-12 border border-white/10 text-center">
              <Smile size={64} className="text-pink-400 mx-auto mb-8 animate-bounce" />
              <h3 className="text-3xl font-black text-white mb-4">Join the Future</h3>
              <p className="text-white/60 text-lg font-medium leading-relaxed mb-8">
                AI editing is evolving faster than ever — and we're building tools that help you stay ahead.
              </p>
              <Link to="/signup" className="inline-block px-8 py-4 bg-white text-[#0f0f1a] rounded-full font-black text-lg hover:bg-pink-50 transition-colors">
                Get Started Now
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
