import React, { useState } from 'react';
import { Camera, Save, User } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.j@gmail.com',
    phone: '+232 76 123 456',
    childName: 'Daniel Williams',
    grade: 'Grade 4'
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile Updated Successfully!');
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">Manage your account settings.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-primary-600 font-bold mt-2">Change Photo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <input 
                    name="name"
                    value={user.name} 
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                <input 
                    name="email"
                    value={user.email} 
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                <input 
                    name="phone"
                    value={user.phone} 
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Child's Name</label>
                <input 
                    name="childName"
                    value={user.childName} 
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                />
            </div>
        </div>

        <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-all"
        >
            <Save className="w-4 h-4" />
            Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
