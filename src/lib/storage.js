// Initial Data
const initialFees = [
  { id: 1, term: "1st Term 2024/2025", amount: 250000, status: "unpaid", dueDate: "2024-09-15" },
  { id: 2, term: "Summer Camp 2024", amount: 50000, status: "paid", dueDate: "2024-07-20" },
  { id: 3, term: "3rd Term 2023/2024", amount: 200000, status: "paid", dueDate: "2024-04-15" },
];

const initialAnnouncements = [
  {
    id: 1,
    title: "Christmas Carol Service",
    date: "Dec 14, 2024",
    category: "Events",
    content: "Join us for a magical evening of carols..."
  },
  {
    id: 2,
    title: "Report Card Collection",
    date: "Dec 18, 2024",
    category: "Academic",
    content: "End of term report cards will be available..."
  },
  {
    id: 3,
    title: "New School Bus Route",
    date: "Nov 30, 2024",
    category: "Transport",
    content: "We have added a new bus route..."
  }
];

// Helper to get data from storage or set initial
const getStorage = (key, initial) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initial;
  } catch (e) {
    return initial;
  }
};

const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// --- API Methods ---

export const db = {
  fees: {
    getAll: () => getStorage('fees', initialFees),
    pay: (id) => {
      const fees = getStorage('fees', initialFees);
      const updated = fees.map(f => f.id === id ? { ...f, status: 'paid', paidAt: new Date().toISOString() } : f);
      setStorage('fees', updated);
      return updated;
    }
  },
  announcements: {
    getAll: () => getStorage('announcements', initialAnnouncements),
  },
  chats: {
    getHistory: () => getStorage('chat_history', [
       { id: 1, sender: 'admin', text: 'Hello! Welcome to Shalomville Support. How can we help you today?' }
    ]),
    send: (text) => {
      const msgs = getStorage('chat_history', []);
      const newMsg = { id: Date.now(), sender: 'user', text };
      const updated = [...msgs, newMsg];
      setStorage('chat_history', updated);
      
      // Auto reply simulation
      setTimeout(() => {
        const msgsAfter = getStorage('chat_history', []);
        const reply = { id: Date.now() + 1, sender: 'admin', text: "Thanks for reaching out! We've received your message." };
        setStorage('chat_history', [...msgsAfter, reply]);
        // Note: This won't trigger a re-render in React automatically without an event listener or context, 
        // using the hook pattern in components is better or dispatching a custom event.
        window.dispatchEvent(new Event('chat-update'));
      }, 1000);
      
      return updated;
    }
  }
};

export const currentUser = {
  name: "Mrs. Sarah Williams",
  childName: "Daniel Williams",
  grade: "Grade 4",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
};
