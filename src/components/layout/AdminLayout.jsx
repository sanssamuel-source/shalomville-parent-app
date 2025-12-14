import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckCircle, MessageSquare, LogOut, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
    { icon: CheckCircle, label: 'Payments', path: '/admin/payments' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: Users, label: 'Students', path: '/admin/students' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-900 text-white min-h-screen flex flex-col">
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white">
            A
          </div>
          <div>
            <h2 className="font-bold text-lg">Admin Portal</h2>
            <p className="text-xs text-gray-400">Shalomville Schools</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-gray-400 hover:text-white hover:bg-gray-800",
                isActive && "bg-orange-600 text-white shadow-lg shadow-orange-900/20"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 font-medium hover:bg-gray-800 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
