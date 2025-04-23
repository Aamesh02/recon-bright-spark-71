
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LayoutDashboard,
  Settings,
  FileText,
  BarChart3,
  Users,
  Search,
  LogOut,
  PlusCircle
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

// Bounce animation for the "R" logo
const bounceClass = `hover:animate-bounce transition-transform`;

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Recon Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
    { name: 'Reporting Settings', icon: <FileText className="w-5 h-5" />, path: '/reporting' },
    { name: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, path: '/analytics' },
    { name: 'User Management', icon: <Users className="w-5 h-5" />, path: '/users' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    if (path !== '/dashboard' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex h-screen bg-gradient-dark overflow-hidden">
      {/* Sidebar */}
      <div
        className="
          hidden md:flex flex-col w-64
          bg-[linear-gradient(140deg,_#7E69AB_0%,_#9b87f5_70%,_#7E69AB_100%)]
          drop-shadow-xl
        "
        style={{
          background: 'linear-gradient(140deg, #7E69AB 0%, #9b87f5 80%, #7E69AB 100%)'
        }}
      >
        <div className="p-4">
          <div className="flex flex-col items-center mb-8">
            {/* Only the "R" logo, vibrant gradient, bouncy on hover, centered */}
            <div
              className={`relative w-14 h-14 flex items-center justify-center mb-2 rounded-xl shadow-lg overflow-hidden cursor-pointer ${bounceClass}`}
              style={{
                background: 'linear-gradient(135deg, #a389fd 0%, #7E69AB 100%)',
                boxShadow: '0 0 15px 4px #a389fd33'
              }}
              tabIndex={0}
              aria-label="Recon Logo"
            >
              <span
                className="text-4xl font-black select-none"
                style={{
                  background: 'linear-gradient(90deg, #fff, #ffe29f, #9b87f5, #f97316 95%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                R
              </span>
            </div>
            <div className="text-center">
              <h1 className="font-semibold text-lg leading-6 text-foreground tracking-tight">Recon Platform</h1>
              <p className="text-xs text-sidebar-foreground/70">{user?.organization}</p>
            </div>
          </div>
          <div className="mb-10"></div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <span className={isActive(item.path) ? 'text-cyan-blue mr-3' : 'text-sidebar-foreground/70 mr-3'}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-sidebar-border/40">
          <button
            onClick={handleLogout}
            className="sidebar-item group"
          >
            <LogOut className="w-5 h-5 text-sidebar-foreground/70 group-hover:text-sidebar-foreground mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-black/30 backdrop-blur-sm shadow-md z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reconciliation tasks..."
                  className="w-[300px] pl-9 bg-black/30 border-white/10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="gradient-btn">
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Create</span>
              </Button>
              <div className="flex items-center">
                <div className="mr-3 text-right">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs text-gray-400">{user?.email}</div>
                </div>
                <Avatar>
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-button">{user?.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-transparent p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
