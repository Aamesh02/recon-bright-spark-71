
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
        "w-64 bg-[#171622] h-screen fixed border-r border-[#2a2938] transition-transform",
        isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
        "z-40"
      )}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <Link to="/dashboard" className="flex items-center">
              <div className="text-[#33C3F0] mr-2">
                <svg width="26" height="26" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 0L23.8175 3.65L30.135 7.3L30.1325 14.6L30.13 21.9L23.8125 25.55L17.495 29.2L11.1775 25.55L4.86 21.9L4.8625 14.6L4.865 7.3L11.1825 3.65L17.5 0Z" fill="#33C3F0"/>
                  <path d="M17.5 35.0001C16.6342 35.0001 15.7683 34.7551 15.015 34.2651L4.515 28.0151C3.02 27.0401 2.05 25.3151 2.05 23.4551V11.5451C2.05 9.67014 3.0375 7.94514 4.515 6.98514L15.015 0.735143C16.5025 -0.244857 18.4975 -0.244857 19.985 0.735143L30.485 6.98514C31.98 7.96014 32.95 9.68514 32.95 11.5451V23.4551C32.95 25.3301 31.9625 27.0551 30.485 28.0151L19.985 34.2651C19.2317 34.7551 18.3658 35.0001 17.5 35.0001ZM17.5 3.50014C17.1525 3.50014 16.805 3.60014 16.5225 3.78514L6.0225 10.0351C5.425 10.3851 5.075 11.0301 5.075 11.7051V23.4551C5.075 24.1151 5.425 24.7601 6.0225 25.1101L16.5225 31.3601C17.08 31.7101 17.92 31.7101 18.4775 31.3601L28.9775 25.1101C29.575 24.7601 29.925 24.1151 29.925 23.4401V11.5451C29.925 10.8851 29.575 10.2401 28.9775 9.89014L18.4775 3.64014C18.195 3.60014 17.8475 3.50014 17.5 3.50014Z" fill="#33C3F0"/>
                </svg>
              </div>
              <h1 className="font-bold text-lg text-[#33C3F0]">RECON</h1>
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
        {children}
      </div>
    </div>
  );
};

export default Layout;
