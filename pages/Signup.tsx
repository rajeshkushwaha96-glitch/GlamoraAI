import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userId = 'user_' + Date.now();
    const newUser = { email, password, userId, isPremium: false };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-6 border rounded" required />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Sign Up</button>
        <p className="mt-4 text-sm text-center">Already have an account? <Link to="/login" className="text-indigo-600">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
