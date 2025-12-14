import React, { useState, useEffect } from 'react';
import { db } from '../../lib/storage';
import { Check, X, Eye } from 'lucide-react';

const PaymentVerification = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    setFees(db.fees.getAll());
  }, []);

  const handleApprove = (id) => {
    if (confirm('Verify this payment as received?')) {
      const updated = db.fees.pay(id);
      setFees(updated);
      alert('Payment Verified Successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Verification</h1>
        <p className="text-gray-500">Review and approve bank transfer claims.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Payment Method</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Proof</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
               <tr key={fee.id} className="border-b border-gray-50 hover:bg-gray-50">
                 <td className="px-6 py-4 font-medium text-gray-900">
                    Daniel Williams
                    <div className="text-xs text-gray-400">{fee.term}</div>
                 </td>
                 <td className="px-6 py-4 text-gray-500">Bank Transfer / Mobile Money</td>
                 <td className="px-6 py-4 font-mono text-gray-600">SLE {fee.amount.toLocaleString()}</td>
                 <td className="px-6 py-4">
                   <button className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium">
                     <Eye className="w-4 h-4" /> View Receipt
                   </button>
                 </td>
                 <td className="px-6 py-4">
                   {fee.status === 'paid' ? (
                     <span className="text-green-600 font-bold text-sm flex items-center gap-1">
                       <Check className="w-4 h-4" /> Verified
                     </span>
                   ) : (
                     <div className="flex gap-2">
                       <button 
                         onClick={() => handleApprove(fee.id)}
                         className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                         title="Approve"
                       >
                         <Check className="w-4 h-4" />
                       </button>
                       <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Reject">
                         <X className="w-4 h-4" />
                       </button>
                     </div>
                   )}
                 </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentVerification;
