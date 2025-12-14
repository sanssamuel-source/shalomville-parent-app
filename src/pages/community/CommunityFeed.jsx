import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Image, Send, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';
import { db } from '../../lib/storage';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    setPosts(db.community.getFeed());
  }, []);

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      author: "Start Parent",
      role: "Parent",
      avatar: "https://i.pravatar.cc/150?u=99",
      time: "Just now",
      content: newPost,
      image: null,
      likes: 0,
      comments: 0
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    // In a real app we'd save to DB here
    localStorage.setItem('community_feed', JSON.stringify(updatedPosts)); 
    setNewPost('');
  };

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="max-w-xl mx-auto pb-20 md:pb-0 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Shalomville Community</h1>
        <p className="text-gray-500">Connect with parents and school administration.</p>
      </div>

      {/* Post Creator */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex gap-3">
          <img src="https://i.pravatar.cc/150?u=99" alt="You" className="w-10 h-10 rounded-full" />
          <form onSubmit={handlePost} className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              rows={2}
              className="w-full bg-gray-50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
            />
            <div className="flex justify-between items-center mt-3">
              <button type="button" className="text-gray-400 hover:text-primary-600 transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button 
                type="submit"
                disabled={!newPost.trim()}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-primary-700 transition-all flex items-center gap-2"
              >
                Post <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 flex gap-3">
              <img src={post.avatar} alt={post.author} className={cn("w-10 h-10 rounded-full object-cover bg-gray-100", post.role === 'Official' ? "p-1" : "")} />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      {post.author}
                      {post.role === 'Official' && <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider">Admin</span>}
                    </h3>
                    <p className="text-xs text-gray-500">{post.role} • {post.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5"/></button>
                </div>
                
                <p className="mt-3 text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                
                {post.image && (
                  <div className="mt-3 rounded-xl overflow-hidden">
                    <img src={post.image} alt="Post attachment" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                )}

                <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-50">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors group"
                  >
                    <Heart className="w-5 h-5 group-hover:fill-current" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 transition-colors ml-auto">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
