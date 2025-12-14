import React, { useState, useEffect } from 'react';
import { db } from '../../lib/storage';
import { Send, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');

  useEffect(() => {
    setMessages(db.chats.getHistory());
    const handleUpdate = () => setMessages(db.chats.getHistory());
    window.addEventListener('chat-update', handleUpdate);
    return () => window.removeEventListener('chat-update', handleUpdate);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    // We manually push to storage since db.chats.send is for user->admin
    // Creating a manual admin message
    const currentMsgs = db.chats.getHistory();
    const newMsg = { id: Date.now(), sender: 'admin', text: reply };
    const updated = [...currentMsgs, newMsg];
    localStorage.setItem('chat_history', JSON.stringify(updated));
    
    // Dispatch event so UI updates
    window.dispatchEvent(new Event('chat-update'));
    setReply('');
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h2 className="font-bold text-gray-900">Support Inbox</h2>
        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Daniel Williams (Grade 4)</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex gap-3 max-w-[70%]",
              msg.sender === 'admin' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold",
              msg.sender === 'admin' ? "bg-gray-800 text-white" : "bg-orange-100 text-orange-700"
            )}>
              {msg.sender === 'admin' ? 'A' : 'P'}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm shadow-sm",
              msg.sender === 'admin' 
                ? "bg-gray-800 text-white rounded-tr-none" 
                : "bg-white border border-gray-200 text-gray-700 rounded-tl-none"
            )}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
        <input 
          type="text" 
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type reply to parent..."
          className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
        />
        <button 
          type="submit"
          className="px-6 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default AdminMessages;
