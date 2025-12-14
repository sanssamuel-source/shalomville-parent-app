```javascript
// Initial Data
const initialFees = [
    { id: 1, term: '1st Term School Fees', amount: 5000, status: 'paid', dueDate: 'Sept 15, 2025' },
    { id: 2, term: 'Uniform & Sport Wears', amount: 1500, status: 'unpaid', dueDate: 'Oct 01, 2025' },
    { id: 3, term: 'ICT & Science Lab / Practical', amount: 800, status: 'unpaid', dueDate: 'Oct 15, 2025' },
    { id: 4, term: 'Text Books / Note Books', amount: 2000, status: 'unpaid', dueDate: 'Oct 15, 2025' },
  ];
  
  const initialAnnouncements = [
    {
      id: 1,
      title: "Moral Values",
      category: "Education",
      date: "2024-07-17",
      content: "At Shalomville, we prioritize moral values alongside academic excellence. We believe in raising a total child who shines in character and learning.",
      link: "https://shalomvilleschoolsinternational.org/newsacademy.php#Moral%20Values"
    },
    {
      id: 2,
      title: "Education Excellence",
      category: "Academic",
      date: "2024-07-17",
      content: "Our promise to parents is to make their children excellent pupils that will be innovative, creative, and award-winning children, hence becoming the pride of our nation.",
      link: "https://shalomvilleschoolsinternational.org/newsacademy.php#Education"
    },
    {
      id: 3,
      title: "Science & Innovation Fair",
      category: "Events",
      date: "2025-02-15",
      content: "Join us for our annual Science Fair where students showcase their innovative projects. Parents are invited to witness the creativity of our young scientists.",
      link: "#"
    }
  ];

  const initialChats = [
    { id: 1, sender: 'user', text: 'Hello, I have a question about the uniform fees.' },
    { id: 2, sender: 'admin', text: 'Good day! I can help you with that. The uniform set costs SLE 1,500.' },
  ];

  const initialCommunityPosts = [
    {
        id: 1,
        author: "Admin",
        role: "Official",
        avatar: "https://shalomvilleschoolsinternational.org/advert/17212338057fb9d49a72756b23e2dce42ffbe17a2b.png",
        time: "1 hour ago",
        content: "Welcome to Shalomville Schools International! We are dedicated to fostering a dynamic educational environment that encourages creativity, critical thinking, and personal growth.",
        likes: 42,
        comments: 5,
        image: "https://shalomvilleschoolsinternational.org/advert/172123386768b5569477028e219fb0a9ea97977465.jpg"
    },
    {
        id: 2,
        author: "Principal",
        role: "Official",
        avatar: "https://shalomvilleschoolsinternational.org/director.jpg",
        time: "3 hours ago",
        content: "Our commitment to excellence in education is reflected in every aspect of our school community. We promise to make your children excellent pupils!",
        likes: 89,
        comments: 12,
        image: null
    }
  ];

// --- API Methods ---

export const db = {
  fees: {
    getAll: () => JSON.parse(localStorage.getItem('fees')) || initialFees,
    pay: (id) => {
      const fees = JSON.parse(localStorage.getItem('fees')) || initialFees;
      const updated = fees.map(f => f.id === id ? { ...f, status: 'paid' } : f);
      localStorage.setItem('fees', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      return updated;
    }
  },
  announcements: {
    getAll: () => JSON.parse(localStorage.getItem('announcements')) || initialAnnouncements,
  },
  chats: {
    getHistory: () => JSON.parse(localStorage.getItem('chat_history')) || initialChats,
    send: (text) => {
      const msgs = JSON.parse(localStorage.getItem('chat_history')) || initialChats;
      const newMsg = { id: Date.now(), sender: 'user', text };
      const updated = [...msgs, newMsg];
      localStorage.setItem('chat_history', JSON.stringify(updated));
      
      // Simulate Admin Reply
      if (text.toLowerCase().includes('fee') || text.toLowerCase().includes('pay')) {
         setTimeout(() => {
           const autoReply = { id: Date.now() + 1, sender: 'admin', text: "Please verify your payment details in the Fees tab. If successful, it will update automatically." };
           const withReply = [...updated, autoReply];
           localStorage.setItem('chat_history', JSON.stringify(withReply));
           window.dispatchEvent(new Event('chat-update'));
         }, 2000);
      }
      
      return updated;
    }
  },
  community: {
      getFeed: () => JSON.parse(localStorage.getItem('community_feed')) || initialCommunityPosts,
  }
};

// Initialize storage if empty
if (!localStorage.getItem('fees')) localStorage.setItem('fees', JSON.stringify(initialFees));
if (!localStorage.getItem('announcements')) localStorage.setItem('announcements', JSON.stringify(initialAnnouncements));
if (!localStorage.getItem('chat_history')) localStorage.setItem('chat_history', JSON.stringify(initialChats));
if (!localStorage.getItem('community_feed')) localStorage.setItem('community_feed', JSON.stringify(initialCommunityPosts));

export const currentUser = {
  name: "Mrs. Sarah Williams",
  childName: "Daniel Williams",
  grade: "Grade 4",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
};
```
