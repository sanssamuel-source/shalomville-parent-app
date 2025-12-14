import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Home from './pages/dashboard/Home';
import AppShell from './components/layout/AppShell';
import FeeList from './pages/fees/FeeList';
import AnnouncementFeed from './pages/announcements/AnnouncementFeed';
import Support from './pages/support/Support';

// Admin Components
import AdminLayout from './components/layout/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import PaymentVerification from './pages/admin/PaymentVerification';
import AdminMessages from './pages/admin/AdminMessages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Dashboard Layout */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/fees" element={<FeeList />} />
          <Route path="/announcements" element={<AnnouncementFeed />} />
          <Route path="/support" element={<Support />} />
        </Route>

        {/* Admin Portal Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
           <Route path="/admin/dashboard" element={<AdminDashboard />} />
           <Route path="/admin/payments" element={<PaymentVerification />} />
           <Route path="/admin/messages" element={<AdminMessages />} />
           <Route path="/admin/students" element={<div className="p-8">Students List (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
