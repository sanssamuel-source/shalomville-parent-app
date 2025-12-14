import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, FileText, Send, Bot } from 'lucide-react';
import { cn } from '../../lib/utils';
import { db } from '../../lib/storage';

const HelperChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    setMessages(db.chats.getHistory());
    
    const handleUpdate = () => setMessages(db.chats.getHistory());
    window.addEventListener('chat-update', handleUpdate);
    return () => window.removeEventListener('chat-update', handleUpdate);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    db.chats.send(input);
    setMessages(db.chats.getHistory()); // Optimistic update
    setInput('');
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 bg-primary-50 border-b border-primary-100 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">School Admin</h3>
          <p className="text-xs text-green-600 font-medium">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex gap-2 max-w-[80%]",
              msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold",
              msg.sender === 'user' ? "bg-primary-100 text-primary-700" : "bg-white border border-gray-200 text-gray-600"
            )}>
              {msg.sender === 'user' ? 'ME' : 'AD'}
            </div>
            <div className={cn(
              "p-3 rounded-2xl text-sm",
              msg.sender === 'user' 
                ? "bg-primary-600 text-white rounded-tr-none" 
                : "bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm"
            )}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
        />
        <button 
          type="submit"
          className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
// ... ComplaintForm remains the same as it's just a demo submit ...

const ComplaintForm = () => {
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000); // Reset for demo
    };
  
    if (submitted) {
      return (
        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Complaint Logged</h3>
          <p className="text-gray-500 max-w-sm">We have received your complaint. A ticket number has been sent to your email.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-6 text-primary-600 font-medium hover:underline"
          >
            File another complaint
          </button>
        </div>
      );
    }
  
    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Subject</label>
          <input 
            type="text" 
            placeholder="e.g., Wrong grade recording"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            required 
          />
        </div>
  
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
            <option>Academics</option>
            <option>Facilities</option>
            <option>Discipline / Bullying</option>
            <option>Transport</option>
            <option>Other</option>
          </select>
        </div>
  
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Message</label>
          <textarea 
            rows={5}
            placeholder="Describe your issue in detail..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
            required 
          ></textarea>
        </div>
  
        <button 
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/30 transition-all"
        >
          Submit Complaint
        </button>
      </form>
    );
};

const Support = () => {
    const [activeTab, setActiveTab] = useState('chat');
  
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-500">How can we help you today?</p>
        </div>
  
        <div className="flex p-1 bg-gray-100 rounded-xl w-full md:w-auto md:inline-flex">
          <button
            onClick={() => setActiveTab('chat')}
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 md:flex-none",
              activeTab === 'chat' ? "bg-white text-primary-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <MessageCircle className="w-4 h-4" />
            Live Chat
          </button>
          <button
            onClick={() => setActiveTab('complaint')}
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 md:flex-none",
              activeTab === 'complaint' ? "bg-white text-primary-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <FileText className="w-4 h-4" />
            File Complaint
          </button>
        </div>
  
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {activeTab === 'chat' ? <HelperChat /> : <ComplaintForm />}
        </div>
      </div>
    );
};

export default Support;
