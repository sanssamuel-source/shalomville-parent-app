import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Home from './pages/dashboard/Home';
import AppShell from './components/layout/AppShell';
import FeeList from './pages/fees/FeeList';
import AnnouncementFeed from './pages/announcements/AnnouncementFeed';
import Support from './pages/support/Support';

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
      </Routes>
    </Router>
  );
}

export default App;
