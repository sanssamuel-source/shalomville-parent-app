import React, { useState, useEffect } from 'react';
import { ArrowRight, Wallet, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { currentUser, db } from '../../lib/storage';
import { cn } from '../../lib/utils';

const Home = () => {
  const navigate = useNavigate();
  const [fees, setFees] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    setFees(db.fees.getAll());
    setAnnouncements(db.announcements.getAll());
  }, []);

  const outstandingFee = fees.find(f => f.status === 'unpaid');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 md:pb-0">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {currentUser.name}</h1>
          <p className="text-gray-500">Parent of {currentUser.childName} ({currentUser.grade})</p>
        </div>
        <img 
          src={currentUser.avatar} 
          alt="Profile" 
          className="w-12 h-12 rounded-full border-2 border-primary-100 hidden md:block"
        />
      </div>

      {/* Fee Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-primary-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl shadow-primary-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <p className="text-primary-100 font-medium mb-1">Outstanding Balance</p>
            <h2 className="text-4xl font-bold mb-4">
              ₦{outstandingFee ? outstandingFee.amount.toLocaleString() : '0.00'}
            </h2>
            
            {outstandingFee ? (
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate('/fees')}
                  className="bg-white text-primary-600 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-primary-50 transition-colors shadow-sm"
                >
                  Pay Now
                </button>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-lg backdrop-blur-sm text-xs font-medium">
                  <Clock className="w-4 h-4" />
                  Due: {outstandingFee.dueDate}
                </div>
              </div>
            ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  All fees paid
                </div>
            )}
          </div>
        </div>

        {/* Quick Actions / Stats Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">School Updates</h3>
            <p className="text-gray-500 text-sm">You have <span className="font-bold text-primary-600">3 new</span> announcements this week.</p>
          </div>
          <button 
            onClick={() => navigate('/announcements')}
            className="mt-4 w-full bg-primary-50 text-primary-700 py-3 rounded-xl font-medium hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
          >
            View All Updates
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Announcements Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Latest News</h2>
          <button onClick={() => navigate('/announcements')} className="text-sm text-primary-600 font-medium hover:underline">View All</button>
        </div>
        
        <div className="space-y-4">
          {announcements.slice(0, 2).map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/announcements')}>
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full",
                  item.category === 'Events' ? "bg-purple-50 text-purple-600" :
                  item.category === 'Academic' ? "bg-blue-50 text-blue-600" :
                  "bg-gray-100 text-gray-600"
                )}>
                  {item.category}
                </span>
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
