
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, Lock, Sparkles } from 'lucide-react';
import { checkUserPremium } from '../src/lib/premium';

interface DownloadDropdownProps {
  onDownload: (quality: '720' | '1080' | '4k') => void;
  disabled?: boolean;
}

const DownloadDropdown: React.FC<DownloadDropdownProps> = ({ onDownload, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isPremium = checkUserPremium();

  const options = [
    { id: '720p', label: 'Download 720p', quality: 'Standard', isFree: true },
    { id: '1080p', label: 'Download 1080p', quality: 'High', isFree: false, premium: true },
    { id: '4k', label: 'Download 4K', quality: 'Ultra', isFree: false, premium: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (quality: '720' | '1080' | '4k') => {
    if ((quality === '1080' || quality === '4k') && !isPremium) {
      alert(`${quality === '1080' ? '1080p' : '4K'} download is a Premium feature 🚀`);
      window.location.href = "/#/pricing";
      setIsOpen(false);
      return;
    }
    onDownload(quality);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-medium text-sm transition-all active:scale-95 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <Download size={16} />
        <span>Download</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50"
          >
            <div className="p-1.5">
              <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Quality
              </div>
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id.replace('p', '') as any)}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors group text-left"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                      {option.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {option.quality} Quality
                    </span>
                  </div>
                  {option.premium && !isPremium && (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded-md border border-amber-100">
                      <span className="text-[9px] font-black uppercase tracking-tight">Premium</span>
                      <Lock size={10} />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="bg-slate-50 p-2 border-t border-slate-100">
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                  <Sparkles size={10} className="text-purple-500" />
                  <span>Premium unlocks 1080p, 4K & no watermark</span>
                </div>
                {!isPremium && (
                  <div className="text-[9px] text-slate-400 italic">
                    Free downloads include watermark
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DownloadDropdown;
