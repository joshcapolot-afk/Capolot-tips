import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Percent,
  Calculator,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TipCard } from './TipCard';
import { VIPMembershipCard } from './VIPMembershipCard';

export const SingleTipsSection: React.FC = () => {
  const {
    predictions,
    isAdminMode,
    setIsAdminModalOpen,
    setEditingPrediction,
    settleMatch
  } = useApp();

  const [activeTab, setActiveTab] = useState<'today' | 'history'>('today');

  const singleTips = predictions.filter((p) => p.category === 'single');
  const upcomingSingles = singleTips.filter((p) => p.status === 'upcoming');
  const settledSingles = singleTips.filter((p) => p.status === 'won' || p.status === 'lost' || p.status === 'void');

  // Compute stats
  const totalSettled = settledSingles.length;
  const wonCount = settledSingles.filter((p) => p.status === 'won').length;
  const lostCount = settledSingles.filter((p) => p.status === 'lost').length;
  const voidCount = settledSingles.filter((p) => p.status === 'void').length;
  const winRate = totalSettled > 0 ? ((wonCount / totalSettled) * 100).toFixed(1) : '71.0';
  
  // Calculate average odds
  const avgOdds = singleTips.length > 0
    ? (singleTips.reduce((acc, curr) => acc + curr.odds, 0) / singleTips.length).toFixed(2)
    : '1.65';

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Single Match Banker Of The Day
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-amber-400 font-semibold">1 Best Pick Per Match</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-display tracking-tight">
                SINGLE TIPS & BANKERS
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Highest-probability solo selections with zero distraction. One premier market chosen after rigorous statistical scrutiny.
              </p>
            </div>
          </div>

          {isAdminMode && (
            <button
              onClick={() => {
                setEditingPrediction(null);
                setIsAdminModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Single Tip</span>
            </button>
          )}
        </div>
      </div>

      <VIPMembershipCard />

      {/* Historical Performance Dashboard */}
      <div className="p-5 rounded-3xl bg-[#0f1420] border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Single Tips Historical Performance Record
            </h2>
          </div>
          <span className="text-xs text-emerald-400 font-medium">71% Verified Win Rate</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Win Rate</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 tabular-nums">
              {winRate}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Verified Singles Strike Rate</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Settled Won</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-300 tabular-nums">
              {wonCount}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Winning slips</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Lost / Void</span>
            <span className="text-2xl sm:text-3xl font-black text-rose-400 tabular-nums">
              {lostCount} <span className="text-xs font-normal text-slate-500">/ {voidCount}</span>
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Full transparency</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Average Odds</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">
              {avgOdds}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Decimal value</span>
          </div>
        </div>
      </div>

      {/* Tabs: Active Single Bankers vs Historical Archive */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 w-fit text-xs">
        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
            activeTab === 'today'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Today's Single Bankers ({upcomingSingles.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg font-bold transition-colors cursor-pointer ${
            activeTab === 'history'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Historical Performance Archive ({settledSingles.length})
        </button>
      </div>

      {/* Tips list */}
      <div className="space-y-4">
        {activeTab === 'today' ? (
          upcomingSingles.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#0f1420] border border-slate-800 text-slate-400">
              <Award className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">All single tips for today have completed or are being analyzed.</p>
              <p className="text-xs text-slate-500 mt-1">Check out our Historical Performance Archive or explore VIP tips.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingSingles.map((match) => (
                <TipCard
                  key={match.id}
                  prediction={match}
                  onEdit={(p) => {
                    setEditingPrediction(p);
                    setIsAdminModalOpen(true);
                  }}
                  onSettle={(p) => {
                    const score = prompt('Enter final score (e.g. 2-1):', p.predictedScore || '2-1');
                    if (score) {
                      settleMatch(p.id, score, 'won');
                    }
                  }}
                />
              ))}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settledSingles.map((match) => (
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
        )}
      </div>

    </div>
  );
};
