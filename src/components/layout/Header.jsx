import React from 'react';
import { Menu, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-4 py-3 flex items-center justify-between md:hidden">
      <div className="flex items-center gap-3">
        <img 
          src="https://shalomvilleschoolsinternational.org/advert/17212338057fb9d49a72756b23e2dce42ffbe17a2b.png" 
          alt="Logo" 
          className="w-8 h-8 object-contain"
        />
        <h1 className="font-bold text-gray-900 text-lg">Shalomville</h1>
      </div>
      
      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
        <Bell className="w-5 h-5" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
    </header>
  );
};

export default Header;
