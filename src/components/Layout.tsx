
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Menu, X, LayoutDashboard, Users, BarChart3, Settings, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from './SearchBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Reporting', href: '/reporting', icon: FileText },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className={cn(
        "w-64 bg-[#1a202c] h-screen fixed border-r border-[#2a2938] transition-transform",
        isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
        "z-40"
      )}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <Link to="/dashboard" className="flex items-center">
              <div className="text-[#33C3F0] mr-2">
                <img 
                  src="/lovable-uploads/f8c4cb81-ae34-49c8-8d8d-6cded9b45efd.png" 
                  alt="RECON Logo" 
                  className="h-8"
                />
              </div>
            </Link>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <nav className="flex-grow">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-gray-800/40 hover:text-white",
                      location.pathname === item.href ? "bg-gray-800/40 text-white" : "text-gray-400"
                    )}
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Separator className="bg-gray-700/50" />

          <div className="mt-auto pt-6">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-200">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className={cn(
        "flex-1 p-8",
        isMobile ? "pl-8" : "pl-64"
      )}>
        {isMobile && (
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2)}</h1>
          <div className="flex items-center space-x-4">
            <SearchBar />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
