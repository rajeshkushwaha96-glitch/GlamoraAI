import React from 'react';
import { Twitter, Instagram, Github, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <Wand2 size={20} />
              </div>
              <span className="font-bold text-xl text-white">Glamora AI</span>
            </div>
            <p className="text-sm text-slate-400">
              Transforming your photos with next-generation AI. Simple, powerful, and fast.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools" className="hover:text-indigo-400">All Tools</Link></li>
              <li><Link to="/pricing" className="hover:text-indigo-400">Pricing</Link></li>
              <li><Link to="/api" className="hover:text-indigo-400">API</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-400">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-indigo-400">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-400">Terms of Service</Link></li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-white"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white"><Github size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Glamora AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;