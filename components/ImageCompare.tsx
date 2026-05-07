import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
}

const ImageCompare: React.FC<ImageCompareProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);
  
  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e as React.MouseEvent).clientX || (e as MouseEvent).clientX) - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent | TouchEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e as React.TouchEvent).touches[0].clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove as any);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove as any);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove as any);
    };
  }, [isResizing]);

  // Fallback for beforeImage
  const finalBeforeImage = beforeImage || afterImage;

  return (
    <motion.div 
      className="relative w-full bg-slate-950 rounded-3xl overflow-hidden select-none cursor-ew-resize group shadow-2xl border border-white/5 flex items-center justify-center min-h-[400px]"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* After Image (Base Layer) */}
      <div className="relative w-full flex items-center justify-center p-1">
        <img 
          src={afterImage} 
          alt="After" 
          className="max-w-full max-h-[75vh] w-auto h-auto block pointer-events-none" 
          referrerPolicy="no-referrer"
        />
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-purple-500/10 pointer-events-none" />
      </div>
      
      {/* Before Image (Overlay with Clip Path) */}
      <div 
        className="absolute inset-0 flex items-center justify-center overflow-hidden z-10 pointer-events-none"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
        }}
      >
        <div className="w-full h-full flex items-center justify-center p-1">
          <img 
            src={finalBeforeImage} 
            alt="Before" 
            className="max-w-full max-h-[75vh] w-auto h-auto block pointer-events-none grayscale-[0.02] brightness-[0.98]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white/30 cursor-ew-resize z-30 flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute inset-y-0 -left-4 -right-4 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="w-10 h-10 -ml-5 bg-white rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center text-indigo-600 border-2 border-indigo-500/20 backdrop-blur-sm transition-transform group-hover:scale-110">
          <ArrowLeftRight size={18} />
        </div>
      </div>

      {/* Labels & Badges */}
      <div className="absolute inset-0 pointer-events-none z-40">
        {/* Before Label */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-1">
          <div className="bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-white/10 shadow-xl uppercase tracking-wider">
            Original
          </div>
        </div>

        {/* After Label */}
        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1">
          <div className="bg-indigo-600/80 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-indigo-400/30 shadow-xl uppercase tracking-wider">
            Enhanced
          </div>
        </div>

        {/* AI Badge */}
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-full border border-indigo-100 shadow-lg flex items-center gap-1.5 uppercase tracking-wider"
          >
            <Sparkles size={12} className="fill-indigo-600" />
            AI Magic
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ImageCompare;
