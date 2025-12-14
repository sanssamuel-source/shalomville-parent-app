import React from 'react';
import { Play, Clock, Calendar } from 'lucide-react';

const recordings = [
    {
        id: 1,
        title: "Beginning of Term Address",
        date: "Sept 10, 2025",
        duration: "45 min",
        thumbnail: "https://images.unsplash.com/photo-1544531696-285097dd7f5b?q=80&w=800&auto=format&fit=crop",
        host: "Principal Anderson"
    },
    {
        id: 2,
        title: "Grade 4 Curriculum Review",
        date: "Oct 5, 2025",
        duration: "1h 15 min",
        thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
        host: "Mrs. Sarah Jenkins"
    },
    {
        id: 3,
        title: "Sports Day Planning Committee",
        date: "Nov 12, 2025",
        duration: "30 min",
        thumbnail: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop",
        host: "Coach Michael"
    }
];

const RecordingLibrary = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Meeting Library</h1>
            <p className="text-gray-500">Watch past meetings and events.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordings.map((video) => (
                <div key={video.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/50 group-hover:scale-110 transition-transform">
                                <Play className="w-5 h-5 ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded">
                            {video.duration}
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{video.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {video.date}</span>
                            <span>• {video.host}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default RecordingLibrary;
