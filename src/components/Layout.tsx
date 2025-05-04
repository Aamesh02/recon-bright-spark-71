
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
      {/* Sidebar - updated to be darker */}
      <div className={cn(
        "w-72 bg-[#10111A] h-screen fixed border-r border-[#1E2030]/30 transition-transform",
        isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
        "z-40"
      )}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex flex-col items-center justify-center mb-14">
            <Link to="/dashboard" className="flex flex-col items-center">
              <div className="mb-3">
                <img 
                  src="/lovable-uploads/41a0de94-8418-48c8-9405-12d773f82150.png" 
                  alt="RECON Logo" 
                  className="h-14"
                />
              </div>
              <span className="text-sm font-medium text-gray-300">ACME Finance</span>
            </Link>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="absolute right-2 top-2">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <nav className="flex-grow mt-6">
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 rounded-md p-3 text-sm font-medium hover:bg-gray-800/40 hover:text-white",
                      location.pathname === item.href ? "bg-gray-800/40 text-white" : "text-gray-400"
                    )}
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Separator className="bg-gray-700/50 my-6" />

          <div className="mt-auto">
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

      {/* Main content area - added margin for spacing between sidebar and content */}
      <div className={cn(
        "flex-1 p-8",
        isMobile ? "pl-8" : "pl-80"
      )}>
        {isMobile && (
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Layout;
