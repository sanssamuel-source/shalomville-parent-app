import React, { useState, useEffect } from 'react';
import { X, Copy, Upload, CheckCircle, CreditCard, Banknote, Smartphone, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';

const PaymentModal = ({ isOpen, onClose, onSuccess, fee }) => {
  const [step, setStep] = useState(1); // 1: Method Selection, 2: Details, 3: Upload, 4: Success
  const [selectedMethod, setSelectedMethod] = useState(null);

  if (!isOpen || !fee) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setStep(4); // Success step
    setTimeout(() => {
      onSuccess?.();
      onClose();
      setStep(1);
      setSelectedMethod(null);
    }, 2500);
  };

  const paymentMethods = [
    { id: 'orange', name: 'Orange Money', icon: Smartphone, color: 'bg-orange-500 text-white', details: { number: '+232 76 123 456', instruction: 'Dial *144# to pay' } },
    { id: 'afrimoney', name: 'Afrimoney', icon: Smartphone, color: 'bg-red-600 text-white', details: { number: '+232 77 987 654', instruction: 'Dial *161# to pay' } },
    { id: 'vult', name: 'Vult', icon: Globe, color: 'bg-blue-600 text-white', details: { number: 'SHALOM-VULT-001', instruction: 'Send to Vult ID' } },
    { id: 'bank', name: 'Bank Transfer', icon: Banknote, color: 'bg-gray-800 text-white', details: { bank: 'Zenith Bank', name: 'Shalomville Schools', account: '1012345678' } },
    { id: 'card', name: 'Debit Card', icon: CreditCard, color: 'bg-purple-600 text-white', details: { instruction: 'Pay via secure gateway' } },
    { id: 'paypal', name: 'PayPal', icon: Globe, color: 'bg-blue-800 text-white', details: { email: 'payments@shalomville.com', instruction: 'Send to email' } },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-bold text-gray-900">
            {step === 1 ? 'Select Payment Method' : 
             step === 2 ? selectedMethod?.name : 
             step === 3 ? 'Confirm Payment' : 'Success'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-primary-50 p-4 rounded-xl text-center mb-6">
            <p className="text-sm text-primary-600 font-medium mb-1">Amount to Pay</p>
            <h2 className="text-3xl font-bold text-gray-900">SLE {fee.amount.toLocaleString()}</h2>
            <p className="text-xs text-gray-500 mt-1">{fee.term}</p>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setSelectedMethod(method);
                    setStep(2);
                  }}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all group"
                >
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shadow-sm", method.color)}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 group-hover:text-primary-700">{method.name}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && selectedMethod && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Payment Details</h4>
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                  {/* Instructions */}
                  <p className="text-sm text-gray-600 border-b border-gray-200 pb-2">{selectedMethod.details.instruction}</p>

                  {/* Dynamic Fields based on Method */}
                  {selectedMethod.id === 'bank' ? (
                     <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Bank Name</span>
                          <span className="font-medium text-gray-900">{selectedMethod.details.bank}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-gray-500">Account</span>
                           <div className="flex items-center gap-2">
                             <span className="font-mono font-bold text-lg text-primary-600">{selectedMethod.details.account}</span>
                             <button onClick={() => handleCopy(selectedMethod.details.account)}><Copy className="w-4 h-4 text-gray-400 hover:text-primary-600"/></button>
                           </div>
                        </div>
                     </>
                  ) : selectedMethod.details.number ? (
                    <div className="flex justify-between items-center">
                       <span className="text-sm text-gray-500">Number / ID</span>
                       <div className="flex items-center gap-2">
                         <span className="font-mono font-bold text-lg text-primary-600">{selectedMethod.details.number}</span>
                         <button onClick={() => handleCopy(selectedMethod.details.number)}><Copy className="w-4 h-4 text-gray-400 hover:text-primary-600"/></button>
                       </div>
                    </div>
                  ) : selectedMethod.details.email ? (
                    <div className="flex justify-between items-center">
                       <span className="text-sm text-gray-500">Email</span>
                       <div className="flex items-center gap-2">
                         <span className="font-mono font-bold text-sm text-primary-600">{selectedMethod.details.email}</span>
                         <button onClick={() => handleCopy(selectedMethod.details.email)}><Copy className="w-4 h-4 text-gray-400 hover:text-primary-600"/></button>
                       </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex gap-3">
                 <button 
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50"
                 >
                   Back
                 </button>
                 <button 
                  onClick={() => setStep(3)}
                  className="flex-[2] bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/30 transition-all"
                >
                  I have Paid
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="text-center">
                 <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Upload className="w-8 h-8" />
                 </div>
                 <h3 className="font-bold text-gray-900">Upload {selectedMethod?.name} Proof</h3>
                 <p className="text-sm text-gray-500">Please upload your transaction receipt.</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
                <p className="text-sm text-gray-400">Click to select image or PDF</p>
                <input type="file" className="hidden" />
              </div>

              <div className="flex gap-3">
                 <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50"
                 >
                   Back
                 </button>
                 <button 
                  type="submit"
                  className="flex-[2] bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/30 transition-all"
                >
                  Submit Payment
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
             <div className="text-center py-8 animate-in zoom-in spin-in-3">
               <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle className="w-10 h-10" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Submitted!</h3>
               <p className="text-gray-500">Your {selectedMethod?.name} payment of SLE {fee.amount.toLocaleString()} is being processed.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
