import React, { useState, useEffect } from 'react';
import { db } from '../../lib/storage';
import { cn } from '../../lib/utils';
import { Calendar, Tag } from 'lucide-react';

const AnnouncementFeed = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    setAnnouncements(db.announcements.getAll());
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <p className="text-gray-500">Stay updated with the latest news from Shalomville.</p>
      </div>

      <div className="space-y-4">
        {announcements.map((item) => (
          <article key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={cn(
                  "text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full flex items-center gap-1",
                  item.category === 'Events' ? "bg-purple-50 text-purple-600" :
                  item.category === 'Academic' ? "bg-blue-50 text-blue-600" :
                  item.category === 'Transport' ? "bg-green-50 text-green-600" :
                  "bg-gray-100 text-gray-600"
                )}>
                  <Tag className="w-3 h-3" />
                  {item.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>
              
              <h2 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {item.content}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementFeed;
