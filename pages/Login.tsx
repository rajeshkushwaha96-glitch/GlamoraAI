import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      login(user.email, user.isPremium, user.userId);
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative p-4">
      <button onClick={() => window.history.back()} className="absolute top-4 left-4 p-2 text-slate-600 hover:text-indigo-600">
        <ArrowLeft size={24} />
      </button>
      
      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
          <div onClick={() => navigate("/")} className="cursor-pointer text-2xl font-bold mb-6 text-center text-indigo-600">Glamora AI</div>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-6 border rounded" required />
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded mb-4">Login</button>
          
          <button type="button" onClick={() => navigate("/")} className="w-full bg-slate-200 text-slate-800 p-2 rounded mb-4">Continue as Guest</button>
          
          <div className="text-center">
            <button type="button" onClick={() => navigate("/")} className="text-sm text-slate-600 hover:text-indigo-600 mb-4 block w-full">← Back to Home</button>
            <p className="text-sm">Don't have an account? <Link to="/signup" className="text-indigo-600">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
