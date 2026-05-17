import React, { useState } from 'react';
import { PLANS } from '../constants';
import { Check, ArrowRight, Star, Crown, Globe, ShieldCheck, Zap, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const { user, upgradeToPremium } = useUser();

  const handlePayment = async (amount: number, planName: string, cycle: 'monthly' | 'yearly') => {
    if (!(window as any).Razorpay) {
      console.error("Razorpay SDK not loaded");
      alert("Payment system is currently unavailable. Please try again later.");
      return;
    }

    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      console.error("VITE_RAZORPAY_KEY_ID is not defined");
      alert("Payment configuration error. Please contact support.");
      return;
    }

    setIsPaymentLoading(true);
    localStorage.setItem("pendingPayment", "true");

    try {
      // ✅ Create Order
      const orderRes = await fetch('/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount }),
      });

      if (!orderRes.ok) {
        throw new Error("Failed to create order");
      }

      const data = await orderRes.json();

      console.log("ORDER RESPONSE:", data);

      if (!data.id) {
        alert("Order ID missing");
        return;
      }

      // ✅ Razorpay Clean Code
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Glamora AI",
        description: `${planName} Plan`,
        handler: async function (response: any) {
          alert("Payment Successful 🎉");
          console.log(response);

          await upgradeToPremium();
          localStorage.removeItem("pendingPayment");
          navigate('/');
        },
        modal: {
          ondismiss: function () {
            localStorage.removeItem("pendingPayment");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
      localStorage.removeItem("pendingPayment");
    } finally {
      setIsPaymentLoading(false);
    }
  };
  const calculatePrice = (priceStr: string, cycle: 'monthly' | 'yearly') => {
    if (priceStr === '₹0') return '₹0';
    const numericPrice = parseInt(priceStr.replace('₹', ''));
    if (cycle === 'yearly') {
      // 20% discount for yearly
      return `₹${Math.floor(numericPrice * 0.8)}`;
    }
    return priceStr;
  };

  const getPriceValue = (priceStr: string) => {
    return parseInt(priceStr.replace('₹', ''));
  };

  return (
    <div className="bg-[#0f0f1a] min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* 1) HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300 text-xs font-black uppercase tracking-[0.2em] mb-6"
          >
            Pricing Plans
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none"
          >
            Plans for <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">Everyone</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 font-medium leading-relaxed mb-12"
          >
            Choose the perfect plan for your creative journey. Simple, transparent pricing with no hidden fees.
          </motion.p>

          {/* 2) TRUST BADGES */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <ShieldCheck size={16} className="text-emerald-400" /> No hidden fees
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <Clock size={16} className="text-blue-400" /> Cancel anytime
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-wider">
              <Sparkles size={16} className="text-pink-400" /> Trusted by creators
            </div>
          </motion.div>

          {/* 7) PRICING TOGGLE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <span className={`text-sm font-bold transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-white/40'}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-8 rounded-full bg-white/10 border border-white/10 p-1 relative transition-colors hover:border-white/20"
            >
              <motion.div
                animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg"
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-white/40'}`}>Yearly</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                Save 20%
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3, 4, 5) PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-[2.5rem] backdrop-blur-3xl border transition-all duration-500 flex flex-col ${plan.popular
                ? 'bg-white/[0.12] border-purple-500/50 shadow-[0_40px_80px_rgba(123,47,247,0.3)] md:scale-110 z-20'
                : 'bg-white/[0.06] border-white/10 shadow-2xl z-10'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                  {plan.name === 'Pro' ? 'Best Value' : 'Most Popular'}
                </div>
              )}

              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${plan.name === 'Free' ? 'bg-slate-800 text-slate-400' :
                  plan.name === 'Pro' ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white' :
                    'bg-gradient-to-br from-amber-400 to-orange-600 text-white'
                  }`}>
                  {plan.name === 'Free' ? <Globe size={28} /> :
                    plan.name === 'Pro' ? <Star size={28} /> :
                      <Crown size={28} />}
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={billingCycle}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-5xl font-black text-white"
                    >
                      {calculatePrice(plan.price, billingCycle)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-white/50 font-medium">
                    {plan.name === 'Free' ? '/forever' : billingCycle === 'monthly' ? '/month' : '/month, billed yearly'}
                  </span>
                </div>
                <p className="mt-4 text-white/40 text-sm font-medium leading-relaxed">
                  {plan.name === 'Free' ? 'Perfect for trying out our basic AI features.' :
                    plan.name === 'Pro' ? 'Ideal for creators who need high-quality results.' :
                      'The ultimate power for professional workflows.'}
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-white/70 text-sm font-medium">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-purple-500/20 text-purple-300' : 'bg-white/10 text-white/40'
                      }`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.name === 'Free' ? (
                <Link
                  to="/signup"
                  className={`w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] text-center transition-all duration-300 group flex items-center justify-center gap-2 bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:scale-[1.02]`}
                >
                  Start Free
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    console.log("Plan selected:", plan.name);
                    const finalAmount = getPriceValue(calculatePrice(plan.price, billingCycle));
                    const totalAmount = billingCycle === 'yearly' ? finalAmount * 12 : finalAmount;
                    handlePayment(totalAmount, plan.name, billingCycle);
                  }}
                  disabled={isPaymentLoading}
                  className={`w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] text-center transition-all duration-300 group flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] ${isPaymentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isPaymentLoading ? 'Processing...' : (plan.name === 'Starter' ? '🚀 Upgrade with UPI (₹99)' : plan.name === 'Pro' ? '⭐ Get Pro (Best Value)' : plan.cta)}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              )}
              <p className="mt-4 text-center text-xs text-indigo-300 font-medium">
                💡 Recommended: Pay via UPI (No extra charges)
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Text */}
        <div className="flex flex-wrap justify-center gap-8 mb-32">
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <ShieldCheck size={18} className="text-emerald-400" /> 100% Secure Payments via Razorpay
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <Zap size={18} className="text-amber-400" /> Instant Access after Payment
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <Sparkles size={18} className="text-pink-400" /> No Hidden Charges
          </div>
        </div>

        {/* 9) WHY CHOOSE GLAMORA AI? */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Why choose Glamora AI?</h2>
            <p className="text-white/50 font-medium">Experience the next generation of photo editing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-pink-400">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">Lightning Fast</h3>
              <p className="text-white/50 text-sm leading-relaxed">Our advanced AI models process your images in seconds, not minutes.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">Privacy First</h3>
              <p className="text-white/50 text-sm leading-relaxed">Your data is encrypted and never stored without your explicit permission.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">Studio Quality</h3>
              <p className="text-white/50 text-sm leading-relaxed">Get professional-grade results that look natural and realistic every time.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
