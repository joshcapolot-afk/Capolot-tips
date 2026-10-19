import React, { useState } from 'react';
import {
  Crown,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Plus,
  Phone,
  Lock,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TipCard } from './TipCard';
import { VIPMembershipCard } from './VIPMembershipCard';
import { VIP_PACKAGES } from '../data/mockPredictions';
import { HARDCODED_PAYMENT_NUMBER, HARDCODED_PAYMENT_FORMATTED } from '../utils/paymentConfig';
import vipTrophyImg from '../assets/images/capolot_vip_trophy_1792416674081.jpg';

export const VIPTipsSection: React.FC = () => {
  const {
    predictions,
    subscription,
    openPaymentModal,
    isAdminMode,
    setIsAdminModalOpen,
    setEditingPrediction,
    getRemainingVIPTime,
    showToast
  } = useApp();

  const [isCopiedOnScreen, setIsCopiedOnScreen] = useState(false);
  const [isNumberRevealedOnScreen, setIsNumberRevealedOnScreen] = useState(false);

  const remaining = getRemainingVIPTime();

  // Copies payment number to clipboard and reveals it on screen
  const handleCopyPaymentNumberInScreen = () => {
    navigator.clipboard.writeText(HARDCODED_PAYMENT_NUMBER);
    setIsNumberRevealedOnScreen(true);
    setIsCopiedOnScreen(true);
    showToast(`Payment number ${HARDCODED_PAYMENT_NUMBER} copied to clipboard!`, 'success');
    setTimeout(() => setIsCopiedOnScreen(false), 3000);
  };

  // All VIP tips
  const vipTips = predictions.filter((p) => p.category === 'vip' || p.isVIPOnly);
  const upcomingVIP = vipTips.filter((p) => p.status === 'upcoming');
  const settledVIP = vipTips.filter((p) => p.status === 'won' || p.status === 'lost');

  // Calculate VIP Multi Acca odds
  const accaOdds = upcomingVIP.reduce((acc, curr) => acc * curr.odds, 1);

  return (
    <div className="space-y-6 pb-12">
      {/* Top VIP Hero Showcase */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/70 via-[#101726] to-[#070a10] border border-amber-500/50 p-6 sm:p-8 shadow-2xl border-gold-glow">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 fill-amber-400" />
              <span>CAPOLOT VIP SYNDICATE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              EXCLUSIVE <span className="text-gold-gradient">VIP PREDICTIONS</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              High-confidence football analysis curated by veteran match compilers. Includes high-stake banker singles, value rollover tickets, and secret handicap selections.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {!subscription.isVIP ? (
                <button
                  onClick={() => openPaymentModal('weekly')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <Crown className="w-4 h-4 text-slate-950 fill-current" />
                  <span>Unlock VIP from $5 / UGX 15,000</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>VIP Access Unlocked · {remaining.text}</span>
                </div>
              )}

              {isAdminMode && (
                <button
                  onClick={() => {
                    setEditingPrediction(null);
                    setIsAdminModalOpen(true);
                  }}
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Publish VIP Tip</span>
                </button>
              )}
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-amber-500/40 shadow-2xl bg-black">
              <img
                src={vipTrophyImg}
                alt="VIP Trophy"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 justify-center">
                <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase">
                  71% Verified Strike Rate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Status & Renewal Card */}
      <VIPMembershipCard />

      {/* DAILY VIP BANKER MULTI ACCUMULATOR */}
      {subscription.isVIP && upcomingVIP.length > 1 && (
        <div className="p-5 rounded-2xl bg-[#0f1420] border border-amber-500/40 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Today's VIP Mega Accumulator
              </span>
              <h3 className="text-lg font-bold text-slate-100 font-display">
                BANKER MULTI SLIP ({upcomingVIP.length} MATCHES)
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Total Combined Odds</span>
                <span className="text-2xl font-black text-amber-400 tabular-nums">
                  {accaOdds.toFixed(2)}x
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 divide-y divide-slate-800/80 text-xs">
            {upcomingVIP.map((match) => (
              <div key={match.id} className="py-2.5 flex items-center justify-between gap-2">
                <div className="truncate">
                  <span className="font-semibold text-slate-200">
                    {match.homeTeam} vs {match.awayTeam}
                  </span>
                  <span className="text-slate-500 ml-2">({match.league})</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-emerald-400 font-bold">{match.market}</span>
                  <span className="text-amber-400 font-bold tabular-nums">@{match.odds.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIP Packages Comparison (if user not VIP) */}
      {!subscription.isVIP && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-100 font-display">
                SELECT A VIP MEMBERSHIP PLAN
              </h2>
              <p className="text-xs text-slate-400">
                Unlock instant access to all locked VIP predictions and correct score projections
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VIP_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-950 border-amber-500 shadow-xl'
                    : 'bg-[#0f1420] border-slate-800 hover:border-slate-700'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500 text-slate-950 shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="font-bold text-slate-100 text-lg font-display">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{pkg.description}</p>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <span className="text-3xl font-black text-amber-400 tabular-nums">
                      ${pkg.priceUSD}
                    </span>
                    <span className="text-xs text-slate-400 ml-2 tabular-nums">
                      / UGX {pkg.priceUGX.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Valid for {pkg.durationLabel}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => openPaymentModal(pkg.id)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    Select {pkg.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Card with "Copy Payment Number" Action */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-amber-500/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Official Mobile Money Line (MTN & Airtel)
                  </span>

                  {isNumberRevealedOnScreen ? (
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
                      <span className="text-base font-mono tracking-widest text-slate-500 select-none">
                        •••• ••• •••
                      </span>
                      <span className="text-xs text-amber-400/90 font-medium flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Click "Copy Payment Number" to reveal
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
                  onClick={handleCopyPaymentNumberInScreen}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer active:scale-95"
                >
                  {isCopiedOnScreen ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                  <span>{isCopiedOnScreen ? 'Number Copied!' : 'Copy Payment Number'}</span>
                </button>

                {isNumberRevealedOnScreen && (
                  <a
                    href={`https://wa.me/${HARDCODED_PAYMENT_NUMBER}?text=Hello%20CAPOLOT%20TIPS,%20I%20have%20sent%20payment%20for%20VIP`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Revealed USSD Details */}
            {isNumberRevealedOnScreen && (
              <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 animate-in fade-in duration-200">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-amber-400">MTN MoMo:</strong> Dial *165*1*1# &rarr; Enter <span className="font-mono text-amber-300 font-bold">{HARDCODED_PAYMENT_NUMBER}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-red-400">Airtel Money:</strong> Dial *185*1*1# &rarr; Enter <span className="font-mono text-amber-300 font-bold">{HARDCODED_PAYMENT_NUMBER}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIP Match Predictions Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100 font-display">
            TODAY'S VIP MATCH SELECTIONS ({upcomingVIP.length})
          </h2>
          <span className="text-xs text-slate-400">High-Stake Curated Picks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingVIP.map((match) => (
            <TipCard
              key={match.id}
              prediction={match}
              onEdit={(p) => {
                setEditingPrediction(p);
                setIsAdminModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Settled VIP History */}
      {settledVIP.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-100 font-display">
              RECENT VIP RESULTS & SETTLED PICKS
            </h2>
            <span className="text-xs text-emerald-400 font-semibold">Verified Archive</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settledVIP.map((match) => (
              <TipCard
                key={match.id}
                prediction={match}
                onEdit={(p) => {
                  setEditingPrediction(p);
                  setIsAdminModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
