
import React, { useState, useEffect, useRef } from 'react';
import { TOOLS } from '../constants';
import ToolCard from '../components/ToolCard';
import { ToolCategory } from '../types';
import { Search, Filter, ChevronDown, Check, X, ArrowUpDown } from 'lucide-react';

const ToolsDirectory: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'popularity' | 'newest' | 'name_asc' | 'name_desc'>('popularity');
  
  // Dropdown states
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  // Filter out 'All' from the list as we handle it by empty selection
  const availableCategories = Object.values(ToolCategory).filter(c => c !== ToolCategory.ALL);

  // Close dropdown when clicking outside
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [categoryDropdownRef]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
  };

  const filteredAndSortedTools = TOOLS.filter(tool => {
    // Category Filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(tool.category);
    
    // Search Filter
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    // Sorting Logic
    if (sortOption === 'name_asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'name_desc') {
      return b.name.localeCompare(a.name);
    } else if (sortOption === 'newest') {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA; // Descending date
    } else {
      // Default: Popularity
      return (b.popularityScore || 0) - (a.popularityScore || 0);
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Centered */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Glamora AI Tools</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Browse our complete collection of AI-powered photo editing tools. 
            Filter by category, sort by popularity, or search to find exactly what you need.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            
            {/* Left: Search */}
            <div className="relative flex-grow md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search tools (e.g., 'background', 'skin')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
              />
            </div>

            {/* Right: Filters & Sort */}
            <div className="flex flex-row gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0">
              
              {/* Category Dropdown */}
              <div className="relative" ref={categoryDropdownRef}>
                <button 
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategories.length > 0 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Filter size={16} />
                  Categories
                  {selectedCategories.length > 0 && (
                    <span className="bg-indigo-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">
                      {selectedCategories.length}
                    </span>
                  )}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Content */}
                {isCategoryDropdownOpen && (
                  <div className="absolute right-0 md:left-0 md:right-auto mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                    <div className="p-2 space-y-0.5 max-h-64 overflow-y-auto custom-scrollbar">
                      {availableCategories.map((cat) => (
                        <button
                          key={cat as string}
                          onClick={() => toggleCategory(cat as string)}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-slate-50 transition-colors text-left"
                        >
                          <span className={`${selectedCategories.includes(cat as string) ? 'text-indigo-700 font-medium' : 'text-slate-600'}`}>
                            {cat as string}
                          </span>
                          {selectedCategories.includes(cat as string) && <Check size={14} className="text-indigo-600" />}
                        </button>
                      ))}
                    </div>
                    <div className="bg-slate-50 p-2 border-t border-slate-100 flex justify-between">
                      <button 
                        onClick={() => setSelectedCategories([])}
                        className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 font-medium"
                      >
                        Clear
                      </button>
                      <button 
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 px-2 py-1 font-medium"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50 transition-colors w-full sm:w-auto">
                   <ArrowUpDown size={16} className="text-slate-400" />
                   <select 
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as any)}
                      className="bg-transparent border-none p-0 pr-2 focus:ring-0 text-sm font-medium text-slate-700 cursor-pointer outline-none w-full"
                   >
                     <option value="popularity">Most Popular</option>
                     <option value="newest">Newest Added</option>
                     <option value="name_asc">Name (A-Z)</option>
                     <option value="name_desc">Name (Z-A)</option>
                   </select>
                </div>
              </div>

            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategories.length > 0 || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Active Filters:</span>
              
              {selectedCategories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => toggleCategory(cat)}
                  className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-xs font-medium hover:bg-indigo-100 hover:border-indigo-200 transition-colors"
                >
                  {cat} <X size={12} />
                </button>
              ))}
              
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs font-medium hover:bg-slate-200 transition-colors"
                >
                  Search: "{searchQuery}" <X size={12} />
                </button>
              )}

              <button 
                onClick={clearFilters}
                className="text-xs text-slate-500 hover:text-indigo-600 underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedTools.length > 0 ? (
            filteredAndSortedTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-white rounded-xl border border-slate-200 border-dashed">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No tools found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                We couldn't find any tools matching your current filters. 
                Try adjusting your search or removing some categories.
              </p>
              <button 
                onClick={clearFilters}
                className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center text-xs text-slate-400">
          Showing {filteredAndSortedTools.length} of {TOOLS.length} tools
        </div>
      </div>
    </div>
  );
};

export default ToolsDirectory;
