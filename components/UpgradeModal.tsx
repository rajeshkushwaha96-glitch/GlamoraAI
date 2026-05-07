
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Zap, Shield } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Header with Gradient */}
            <div className="h-32 bg-gradient-to-br from-purple-600 to-pink-500 relative flex items-center justify-center">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-purple-600">
                <Sparkles size={40} />
              </div>
            </div>

            <div className="p-8 pt-10 text-center">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Unlock 4K & No Watermark ✨</h2>
              <p className="text-slate-500 font-medium mb-8">Take your photos to the next level with our Premium features.</p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: <Zap size={18} />, text: "4K Ultra HD downloads", color: "text-amber-500", bg: "bg-amber-50" },
                  { icon: <Shield size={18} />, text: "No watermark on any photo", color: "text-blue-500", bg: "bg-blue-50" },
                  { icon: <Sparkles size={18} />, text: "Unlimited daily access", color: "text-purple-500", bg: "bg-purple-50" },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className={`w-10 h-10 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                    <span className="font-bold text-slate-700">{feature.text}</span>
                    <Check size={18} className="ml-auto text-emerald-500" />
                  </div>
                ))}
              </div>

              <button 
                onClick={onUpgrade}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-black text-xl shadow-[0_10px_30px_rgba(147,51,234,0.3)] hover:shadow-[0_15px_40px_rgba(147,51,234,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Upgrade Now 🚀
              </button>
              
              <p className="mt-6 text-xs text-slate-400 font-medium">
                Cancel anytime. Secure payment via Stripe.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;
