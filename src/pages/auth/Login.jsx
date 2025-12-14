import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, Chrome, Phone, MapPin } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate Google Redirect
    setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      
      {/* Left Side - School Info */}
      <div className="md:w-1/2 bg-primary-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1546410531-bb602f92f3c7?q=80')] bg-cover bg-center"></div>
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
                <img 
                    src="https://shalomvilleschoolsinternational.org/advert/17212338057fb9d49a72756b23e2dce42ffbe17a2b.png" 
                    alt="Logo" 
                    className="w-16 bg-white rounded-full p-1"
                />
                <h1 className="text-2xl font-bold leading-tight">Shalomville Schools<br/><span className="text-orange-400">International</span></h1>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Welcome to Parent Academy</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
                "Welcome to Shalomville Schools International, where learning meets inspiration! We are dedicated to fostering a dynamic educational environment that encourages creativity, critical thinking, and personal growth."
            </p>

            <div className="space-y-4 text-sm text-gray-300 border-t border-gray-700 pt-6">
                <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-400 mt-1" />
                    <p>Saidu lane, Off peninsula road, Ogoo farm, Freetown, Sierra Leone</p>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-orange-400" />
                    <p>+232 33 657 803 / +232 75 970 708</p>
                </div>
            </div>
        </div>
        <div className="relative z-10 mt-8 text-xs text-gray-500">
            © 2025 Shalomville Schools International
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900">
                    {isLogin ? 'Parent Login' : 'Create Account'}
                </h2>
                <p className="text-gray-500 mt-2">
                    {isLogin ? 'Access the PTA Portal & Student Reports' : 'Join the Parent Academy Community'}
                </p>
            </div>

            <div className="space-y-4">
                <button 
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-all"
                >
                    <Chrome className="w-5 h-5 text-blue-500" />
                    Continue with Google
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or with email</span></div>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                    {!isLogin && (
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Parent Name"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                    </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="email" 
                                defaultValue={isLogin ? "parent@shalomville.com" : ""}
                                placeholder="name@example.com"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            {isLogin && <a href="#" className="text-xs text-orange-600 hover:underline">Forgot password?</a>}
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="password" 
                                defaultValue="password"
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Authenticating...' : (isLogin ? 'Login to Portal' : 'Register Now')}
                        {!loading && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 pt-4">
                    {isLogin ? "New to the school?" : "Already have an account?"}
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-1 text-orange-600 font-bold hover:underline"
                    >
                        {isLogin ? 'Register Here' : 'Login Here'}
                    </button>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
