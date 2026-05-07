import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ToolsDirectory from './pages/ToolsDirectory';
import Editor from './pages/Editor';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Pricing from './pages/Pricing';
import About from './pages/About';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Helper for generic page layout (Navbar + Content + Footer)
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen font-sans">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  useEffect(() => {
    let id = localStorage.getItem('userId');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', id);
      console.log("Generated new userId:", id);
    } else {
      console.log("Reusing existing userId:", id);
    }
  }, []);

  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/tools" element={<Layout><ToolsDirectory /></Layout>} />
            <Route path="/editor/:toolId" element={<ProtectedRoute><Layout><Editor /></Layout></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
