import React from 'react';
import { User, Image as ImageIcon, CreditCard, Clock, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const mockHistory = [
    { id: '1', tool: 'Remove Background', date: '2 hours ago', url: 'https://picsum.photos/100/100?random=1' },
    { id: '2', tool: 'Cartoonify', date: '1 day ago', url: 'https://picsum.photos/100/100?random=2' },
    { id: '3', tool: 'Face Smooth', date: '3 days ago', url: 'https://picsum.photos/100/100?random=3' },
    { id: '4', tool: 'Upscale', date: '1 week ago', url: 'https://picsum.photos/100/100?random=4' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-fit">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="User" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">John Doe</h3>
                <p className="text-sm text-slate-500">Free Plan</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                <ImageIcon size={20} /> My Edits
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                <CreditCard size={20} /> Subscription
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                <Settings size={20} /> Settings
              </a>
              <div className="pt-4 border-t border-slate-100 mt-4">
                 <a href="#" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
                  <LogOut size={20} /> Log Out
                </a>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                 <div className="text-slate-500 text-sm font-medium mb-1">Credits Remaining</div>
                 <div className="text-3xl font-bold text-slate-900">12 <span className="text-sm font-normal text-slate-400">/ 20</span></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                 <div className="text-slate-500 text-sm font-medium mb-1">Total Edits</div>
                 <div className="text-3xl font-bold text-slate-900">48</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                 <div className="text-slate-500 text-sm font-medium mb-1">Saved Storage</div>
                 <div className="text-3xl font-bold text-slate-900">128 <span className="text-sm font-normal text-slate-400">MB</span></div>
              </div>
            </div>

            {/* Recent Edits */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Recent Activity</h3>
                <Link to="/tools" className="text-sm text-indigo-600 hover:underline">New Edit</Link>
              </div>
              <div className="divide-y divide-slate-100">
                {mockHistory.map(item => (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={item.url} alt="Thumbnail" className="w-16 h-16 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <h4 className="font-semibold text-slate-900">{item.tool}</h4>
                        <div className="flex items-center text-xs text-slate-500 mt-1">
                          <Clock size={12} className="mr-1" /> {item.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="px-3 py-1 text-sm border border-slate-200 rounded-md hover:bg-white text-slate-600">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
