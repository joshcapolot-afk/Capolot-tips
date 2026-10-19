import React, { useState } from 'react';
import {
  X,
  Crown,
  Check,
  Copy,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
  MessageCircle,
  Clock,
  Lock
} from 'lucide-react';
import { VIPPlanType } from '../types';
import { VIP_PACKAGES } from '../data/mockPredictions';
import { HARDCODED_PAYMENT_NUMBER, HARDCODED_PAYMENT_FORMATTED } from '../utils/paymentConfig';
import { useApp } from '../context/AppContext';

export const PaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    closePaymentModal,
    selectedPlanForPayment,
    submitPayment,
    activateVIP,
    showToast
  } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<VIPPlanType>(selectedPlanForPayment || 'weekly');
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'airtel_money' | 'card_other'>('mtn_momo');
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isPaymentModalOpen) return null;

  const currentPkg = VIP_PACKAGES.find((p) => p.id === selectedPlan) || VIP_PACKAGES[1];

  // Number is revealed ONLY when user clicks "Copy Payment Number"
  const handleCopyPaymentNumber = () => {
    navigator.clipboard.writeText(HARDCODED_PAYMENT_NUMBER);
    setIsRevealed(true);
    setCopied(true);
    showToast(`Payment number ${HARDCODED_PAYMENT_NUMBER} copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderPhone && !transactionRef) {
      showToast('Please enter your sender phone number or transaction reference.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitPayment(selectedPlan, senderPhone || 'Registered User', transactionRef || `TXN-${Date.now().toString().slice(-6)}`, paymentMethod);
      setIsSubmitting(false);
    }, 700);
  };

  const handleInstantUnlockDemo = () => {
    activateVIP(selectedPlan, `DEMO-${Date.now().toString().slice(-6)}`, senderPhone || 'Demo Subscriber');
    closePaymentModal();
  };

  const whatsappUrl = `https://wa.me/${HARDCODED_PAYMENT_NUMBER}?text=${encodeURIComponent(
    `Hello CAPOLOT TIPS, I want to confirm my ${currentPkg.name} subscription payment of UGX ${currentPkg.priceUGX.toLocaleString()} ($${currentPkg.priceUSD}).`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0b0f19] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="relative bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/70 p-5 border-b border-amber-500/30">
          <button
            onClick={closePaymentModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Crown className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1">
                <Sparkles className="w-3 h-3" />
                VIP Membership Activation
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-display tracking-tight">
                CAPOLOT TIPS VIP ACCESS
              </h2>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* STEP 1: Select Plan */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px] font-black">
                  1
                </span>
                Select VIP Subscription Package
              </h3>
              <span className="text-xs text-amber-400 font-medium">71% Verified Win Rate</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {VIP_PACKAGES.map((pkg) => {
                const isSelected = selectedPlan === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPlan(pkg.id)}
                    className={`relative p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-slate-950 shadow-sm">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <span className="text-xs font-bold text-slate-300 block">{pkg.name}</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{pkg.durationLabel} Access</span>
                      
                      <div className="mt-2.5">
                        <span className="text-xl font-extrabold text-amber-400 tabular-nums">
                          ${pkg.priceUSD}
                        </span>
                        <span className="text-xs text-slate-400 ml-1.5 tabular-nums">
                          / UGX {pkg.priceUGX.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                      <div className="flex items-center gap-1 text-slate-300">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Daily VIP Banker slip</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>VIP Correct Scores</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Payment Instructions with Copy Payment Number */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0d121e] to-slate-900 border border-amber-500/30 space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px] font-black">
                  2
                </span>
                Payment Instructions & Mobile Money Number
              </h3>
              <span className="text-[11px] text-emerald-400 font-medium">MTN MoMo & Airtel Money</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Send <strong className="text-amber-400 font-bold">UGX {currentPkg.priceUGX.toLocaleString()}</strong> (${currentPkg.priceUSD}) for your <strong className="text-white">{currentPkg.name}</strong> using Mobile Money:
            </p>

            {/* Recipient Line with Copy Payment Number Action */}
            <div className="p-4 rounded-xl bg-black/70 border border-amber-500/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      VIP Payment Number
                    </span>
                    
                    {isRevealed ? (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-lg sm:text-xl font-mono font-bold text-amber-300 tracking-wider">
                          {HARDCODED_PAYMENT_FORMATTED}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Copied
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-base sm:text-lg font-mono tracking-widest text-slate-500 select-none">
                          •••• ••• •••
                        </span>
                        <span className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Click "Copy Payment Number" below
                        </span>
                      </div>
                    )}

                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Account: Joshua Capolot / CAPOLOT TIPS
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyPaymentNumber}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer active:scale-95"
                  >
                    {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Payment Number'}</span>
                  </button>

                  {isRevealed && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* USSD Dialing Guides */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                USSD Dialing Guides:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-amber-400 font-bold">MTN Mobile Money</strong>
                    <span className="text-[10px] text-slate-500 font-mono">*165#</span>
                  </div>
                  {isRevealed ? (
                    <p className="text-slate-300">
                      Dial <strong className="text-white">*165*1*1#</strong> &rarr; Enter <strong className="text-amber-300 font-mono">{HARDCODED_PAYMENT_NUMBER}</strong> &rarr; Amount <strong className="text-amber-400 font-mono">UGX {currentPkg.priceUGX.toLocaleString()}</strong> &rarr; PIN.
                    </p>
                  ) : (
                    <p className="text-slate-400">
                      Dial <strong className="text-slate-300">*165*1*1#</strong> &rarr; Click "Copy Payment Number" to paste recipient number &rarr; Amount <strong className="text-slate-300">UGX {currentPkg.priceUGX.toLocaleString()}</strong>.
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-red-400 font-bold">Airtel Money</strong>
                    <span className="text-[10px] text-slate-500 font-mono">*185#</span>
                  </div>
                  {isRevealed ? (
                    <p className="text-slate-300">
                      Dial <strong className="text-white">*185*1*1#</strong> &rarr; Enter <strong className="text-amber-300 font-mono">{HARDCODED_PAYMENT_NUMBER}</strong> &rarr; Amount <strong className="text-amber-400 font-mono">UGX {currentPkg.priceUGX.toLocaleString()}</strong> &rarr; PIN.
                    </p>
                  ) : (
                    <p className="text-slate-400">
                      Dial <strong className="text-slate-300">*185*1*1#</strong> &rarr; Click "Copy Payment Number" to paste recipient number &rarr; Amount <strong className="text-slate-300">UGX {currentPkg.priceUGX.toLocaleString()}</strong>.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: Verification & Instant Activation */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px] font-black">
                  3
                </span>
                Confirm & Unlock VIP Subscription
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Sender Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 0704... or +256..."
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Transaction ID / SMS Reference
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1928472910 or MoMo Code"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px]">Method:</span>
              <button
                type="button"
                onClick={() => setPaymentMethod('mtn_momo')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  paymentMethod === 'mtn_momo'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                MTN MoMo
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('airtel_money')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  paymentMethod === 'airtel_money'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Airtel Money
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card_other')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  paymentMethod === 'card_other'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Card / Transfer
              </button>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 animate-spin" /> Verifying Payment...
                  </span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Confirm & Activate VIP ({currentPkg.name})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleInstantUnlockDemo}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                title="Instant one-click unlock for testing"
              >
                <Sparkles className="w-4 h-4" />
                <span>Quick Test VIP (Instant Demo)</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified VIP activation with 71% win rate. Valid for {currentPkg.durationDays} days.</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
