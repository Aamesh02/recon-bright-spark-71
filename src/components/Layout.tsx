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
      <div className="hidden md:flex flex-col w-64 bg-sidebar drop-shadow-xl">
        <div className="p-4">
          <div className="flex flex-col items-center mb-8">
            {/* Logo box with gradient overlay */}
            <div className="relative w-14 h-14 flex items-center justify-center mb-2 rounded-xl overflow-hidden shadow-lg" style={{ background: 'linear-gradient(130deg, #9b87f5 20%, #7E69AB 80%)' }}>
              <img
                src="/lovable-uploads/7825ab35-6c67-4be7-994a-d375f2549f3a.png"
                alt="Recon Platform Logo"
                className="w-11 h-11 object-contain z-10"
                draggable={false}
                style={{ userSelect: 'none' }}
              />
              {/* Gradient overlay for extra effect */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  background: 'linear-gradient(120deg,rgba(255,255,255,0.16) 25%,rgba(38,180,255,0.10) 55%,rgba(245,158,11,0.13) 90%)'
                }}
              />
            </div>
            <div className="text-center">
              <h1 className="font-semibold text-lg leading-6 text-foreground tracking-tight">Recon Platform</h1>
              <p className="text-xs text-sidebar-foreground/70">{user?.organization}</p>
            </div>
          </div>
          {/* Added more space here */}
          <div className="mb-6" />
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
