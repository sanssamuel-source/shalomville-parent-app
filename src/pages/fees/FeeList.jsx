import React, { useState, useEffect } from 'react';
import { db } from '../../lib/storage';
import { cn } from '../../lib/utils';
import { Download, AlertCircle, CheckCircle } from 'lucide-react';
import PaymentModal from './PaymentModal';

const FeeList = () => {
  const [fees, setFees] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedFee, setSelectedFee] = useState(null);

  useEffect(() => {
    // Initial fetch
    setFees(db.fees.getAll());
    
    // Listen for storage changes (simulating real-time)
    const handleStorage = () => setFees(db.fees.getAll());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handlePaymentComplete = () => {
    db.fees.pay(selectedFee.id);
    setFees(db.fees.getAll()); // Force refresh
    setSelectedFee(null);
  };

  const filteredFees = fees.filter(f => filter === 'all' ? true : f.status === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Fees</h1>
          <p className="text-gray-500">Manage and track your fee payments.</p>
        </div>
        
        <div className="flex p-1 bg-gray-100 rounded-xl w-full md:w-auto">
          {['all', 'unpaid', 'paid'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium capitalize flex-1 md:flex-none transition-all",
                filter === tab 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredFees.map((fee) => (
          <div key={fee.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-2">
                 <span className={cn(
                   "text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full flex items-center gap-1",
                   fee.status === 'paid' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                 )}>
                   {fee.status === 'paid' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                   {fee.status}
                 </span>
                 <span className="text-xs text-gray-400">Due: {fee.dueDate}</span>
               </div>
               <h3 className="text-lg font-bold text-gray-900">{fee.term}</h3>
               <p className="text-2xl font-bold text-gray-900 mt-1">₦{fee.amount.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-3">
              {fee.status === 'paid' ? (
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Receipt
                </button>
              ) : (
                <button 
                  onClick={() => setSelectedFee(fee)}
                  className="w-full md:w-auto px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-bold text-sm shadow-md shadow-primary-500/20 transition-all"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <PaymentModal 
        isOpen={!!selectedFee} 
        onClose={() => setSelectedFee(null)}
        onSuccess={handlePaymentComplete}
        fee={selectedFee} 
      />
    </div>
  );
};

export default FeeList;
