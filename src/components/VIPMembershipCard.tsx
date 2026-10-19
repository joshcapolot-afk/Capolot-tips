import React from 'react';
import { Crown, Sparkles, Clock, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VIPMembershipCard: React.FC = () => {
  const { subscription, getRemainingVIPTime, openPaymentModal, cancelVIP } = useApp();
  const remaining = getRemainingVIPTime();

  if (!subscription.isVIP) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-[#0c101a] border border-amber-500/30 p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Free Member Status
                </span>
                <span className="text-[10px] text-slate-400">· Standard Access</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 font-display">
                Upgrade to CAPOLOT VIP Today
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Unlock high-odds VIP bankers, HT/FT combos, and correct scores with 71% verified win rate.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openPaymentModal('weekly')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Join VIP from $5</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const expDate = subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : 'Permanent';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/60 via-[#101626] to-[#0a0e17] border border-amber-500/50 p-5 sm:p-6 shadow-2xl border-gold-glow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/30 shrink-0">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-amber-400">
              <Crown className="w-7 h-7 fill-amber-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                ACTIVE VIP
              </span>
              <span className="text-xs font-semibold text-amber-300">
                {subscription.planName || 'VIP Membership'}
              </span>
              {subscription.transactionRef && (
                <span className="text-[11px] text-slate-400 font-mono">
                  Ref: {subscription.transactionRef}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-display mt-1 tracking-tight">
              VIP Privileges Unlocked
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-300 mt-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <Clock className="w-4 h-4" />
                <span className="tabular-nums font-bold">{remaining.text}</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="text-slate-300">
                Renewal Date: <span className="font-semibold text-slate-100">{expDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          <button
            onClick={() => openPaymentModal(subscription.planId)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Extend Plan</span>
          </button>

          <button
            onClick={cancelVIP}
            className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
            title="Reset VIP state for testing"
          >
            Exit VIP
          </button>
        </div>
      </div>
    </div>
  );
};
