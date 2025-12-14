import React, { useState } from 'react';
import { X, Copy, Upload, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const PaymentModal = ({ isOpen, onClose, onSuccess, fee }) => {
  const [step, setStep] = useState(1); // 1: Details, 2: Upload, 3: Success

  if (!isOpen || !fee) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText("1012345678");
    alert("Account number copied!");
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setStep(3);
    setTimeout(() => {
      onSuccess?.();
      onClose();
      setStep(1);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-bold text-gray-900">Make Payment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-primary-50 p-4 rounded-xl text-center">
                <p className="text-sm text-primary-600 font-medium mb-1">Amount to Pay</p>
                <h2 className="text-3xl font-bold text-gray-900">₦{fee.amount.toLocaleString()}</h2>
                <p className="text-xs text-gray-500 mt-1">{fee.term}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Bank Transfer Details</h4>
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Bank Name</span>
                    <span className="font-medium text-gray-900">Zenith Bank</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Account Name</span>
                    <span className="font-medium text-gray-900">Shalomville Schools</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-500">Account Number</span>
                    <div className="flex items-center gap-2">
                       <span className="font-mono font-bold text-lg text-primary-600">1012345678</span>
                       <button onClick={handleCopy} className="text-gray-400 hover:text-primary-600">
                         <Copy className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/30 transition-all"
              >
                I have made the transfer
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="text-center">
                 <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Upload className="w-8 h-8" />
                 </div>
                 <h3 className="font-bold text-gray-900">Upload Proof</h3>
                 <p className="text-sm text-gray-500">Please upload your transaction receipt.</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
                <p className="text-sm text-gray-400">Click to select image or PDF</p>
                <input type="file" className="hidden" />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/30 transition-all"
              >
                Submit Payment
              </button>
            </form>
          )}

          {step === 3 && (
             <div className="text-center py-8 animate-in zoom-in spin-in-3">
               <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle className="w-10 h-10" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Submitted!</h3>
               <p className="text-gray-500">Your payment is being processed. The admin will verify it shortly.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
