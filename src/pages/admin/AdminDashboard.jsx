import React, { useEffect, useState } from 'react';
import { db } from '../../lib/storage';
import { DollarSign, Users, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`p-4 rounded-full ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    setFees(db.fees.getAll());
    const handleStorage = () => setFees(db.fees.getAll());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const totalRevenue = fees
    .filter(f => f.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingPayments = fees.filter(f => f.status === 'unpaid').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, Principal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Revenue (YTD)" 
          value={`SLE ${totalRevenue.toLocaleString()}`} 
          icon={DollarSign} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Pending Fees" 
          value={pendingPayments} 
          icon={AlertCircle} 
          color="bg-orange-500" 
        />
        <StatCard 
          title="Total Students" 
          value="1,240" 
          icon={Users} 
          color="bg-blue-500" 
        />
      </div>

      {/* Recent Activity Table (Mock) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Recent Transactions</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Term</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {fees.slice(0, 5).map((fee) => (
               <tr key={fee.id} className="border-b border-gray-50 hover:bg-gray-50">
                 <td className="px-6 py-4 font-medium text-gray-900">Daniel Williams</td>
                 <td className="px-6 py-4 text-gray-500">{fee.term}</td>
                 <td className="px-6 py-4 font-mono text-gray-600">SLE {fee.amount.toLocaleString()}</td>
                 <td className="px-6 py-4">
                   <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                     fee.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                   }`}>
                     {fee.status}
                   </span>
                 </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
