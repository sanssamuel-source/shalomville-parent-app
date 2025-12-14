
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, Bell, HandHelping, LogOut, Menu, Users, Video, UserCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import Header from './Header';

const AppShell = () => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Wallet, label: 'Fees', path: '/fees' },
    { icon: Bell, label: 'News', path: '/announcements' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Video, label: 'Live Meet', path: '/meetings' },
    { icon: HandHelping, label: 'Support', path: '/support' },
    { icon: UserCircle, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
           <img 
              src="https://shalomvilleschoolsinternational.org/advert/17212338057fb9d49a72756b23e2dce42ffbe17a2b.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h2 className="font-bold text-gray-900 leading-tight">Shalomville</h2>
              <p className="text-xs text-primary-600 font-medium">Parent Portal</p>
            </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group",
                isActive 
                  ? "bg-primary-50 text-primary-700 shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 mb-16 md:mb-0">
        <Header />
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center z-50 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                isActive ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default AppShell;
