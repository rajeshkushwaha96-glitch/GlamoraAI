import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { Tool } from '../types';
import { checkUserPremium } from '../src/lib/premium';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const navigate = useNavigate();
  const isPremiumTool = tool.badge?.toLowerCase() === 'pro';
  const isLocked = isPremiumTool && !checkUserPremium();

  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[tool.iconName] || LucideIcons.Wand2;

  // Colorful Badge Logic
  const getBadgeStyle = (badge?: string) => {
    const b = badge?.toLowerCase() || '';
    if (b === 'new') return 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-[0_0_15px_rgba(52,211,153,0.4)]';
    if (b === 'hot') return 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]';
    if (b === 'pro') return 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]';
    if (b === 'trending') return 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]';
    return 'bg-white/20 text-white border border-white/30';
  };

  const CardContent = (
    <div className="group relative flex flex-col h-full p-8 rounded-[2.5rem] bg-white/[0.08] backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_rgba(123,47,247,0.4)] transition-all duration-500 overflow-hidden">
        {/* Gradient Border Glow (Pink to Purple) */}
        <div className="absolute inset-0 rounded-[2.5rem] p-[1px] bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-indigo-500 transition-all duration-700 -z-10" />
        <div className="absolute inset-[1px] rounded-[2.5rem] bg-[#1a0f2e]/90 -z-10" />

        {/* Shine Sweep Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
        </div>

        {/* Inner Glow Border */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none" />
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Decorative Large Background Icon */}
        <div className="absolute -top-12 -right-12 text-white opacity-[0.05] transform -rotate-12 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700 pointer-events-none z-0" aria-hidden="true">
          <IconComponent size={220} strokeWidth={1} />
        </div>

        <div className="flex items-start justify-between mb-10 relative z-10">
          <div className="relative">
            {/* Glow behind icon */}
            <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-5 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl text-white border border-white/30 group-hover:scale-110 group-hover:border-white/50 transition-all duration-300 shadow-2xl">
              <IconComponent size={32} strokeWidth={2} />
            </div>
          </div>
          {isLocked && (
            <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <LucideIcons.Lock size={12} /> Premium
            </div>
          )}
          {tool.badge && !isLocked && (
            <motion.span 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className={`${getBadgeStyle(tool.badge)} text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-lg relative z-10`}
            >
              {tool.badge}
            </motion.span>
          )}
        </div>
        
        <div className="mb-8 flex-grow relative z-10">
          <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-pink-100 transition-colors">{tool.name}</h3>
          <p className="text-white/70 text-base leading-relaxed font-medium group-hover:text-white/90 transition-colors">{tool.description}</p>
        </div>

        <div className="mt-auto relative z-10 pt-6 border-t border-white/10">
          <div className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] group/btn ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:border-transparent transition-all duration-300 shadow-xl'}`}>
            {isLocked ? 'Premium Only 🔒' : 'Explore Tool'}
            {!isLocked && <LucideIcons.ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-2" />}
          </div>
        </div>
    </div>
  );

  return (
    <motion.div
      whileHover={!isLocked ? { y: -16, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      {isLocked ? (
        <div onClick={() => { alert("This is a Premium feature. Upgrade now!"); navigate("/pricing"); }} className="h-full cursor-pointer">
          {CardContent}
        </div>
      ) : (
        <Link to={`/editor/${tool.id}`} className="h-full block">
          {CardContent}
        </Link>
      )}
    </motion.div>
  );
};

export default ToolCard;
