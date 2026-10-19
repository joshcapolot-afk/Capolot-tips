import React, { useState } from 'react';
import { BarChart3, Filter, Target, Plus, TrendingUp, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TipCard } from './TipCard';
import { VIPMembershipCard } from './VIPMembershipCard';

export const OversUndersSection: React.FC = () => {
  const {
    predictions,
    isAdminMode,
    setIsAdminModalOpen,
    setEditingPrediction
  } = useApp();

  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'upcoming' | 'settled'>('all');

  const goalMarkets = [
    'Over 0.5 Goals',
    'Over 1.5 Goals',
    'Over 2.5 Goals',
    'Over 3.5 Goals',
    'Under 1.5 Goals',
    'Under 2.5 Goals',
    'Under 3.5 Goals',
    'Both Teams to Score - Yes',
    'Both Teams to Score - No'
  ];

  const ouTips = predictions.filter((p) => p.category === 'overs_unders');

  const filteredTips = ouTips.filter((item) => {
    if (selectedMarket !== 'all') {
      const q = selectedMarket.toLowerCase();
      const m = item.market.toLowerCase();
      if (!m.includes(q)) return false;
    }
    if (selectedStatus === 'upcoming' && item.status !== 'upcoming') return false;
    if (selectedStatus === 'settled' && item.status === 'upcoming') return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Goal Analytics & Statistics
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-amber-400 font-semibold">High Liquidity Markets</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-display tracking-tight">
                OVERS / UNDERS & BTTS PREDICTIONS
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Data-driven projections for Over/Under 0.5, 1.5, 2.5, 3.5 goals, and Both Teams to Score (Yes/No) based on team scoring rates and defensive form.
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
              <span>Add Goal Market Tip</span>
            </button>
          )}
        </div>
      </div>

      <VIPMembershipCard />

      {/* Goal Markets Filter Carousel */}
      <div className="p-4 rounded-2xl bg-[#0f1420] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Filter by Goal Market
          </span>
          <button
            onClick={() => setSelectedMarket('all')}
            className={`text-xs ${selectedMarket === 'all' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'} cursor-pointer`}
          >
            Show All
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedMarket('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              selectedMarket === 'all'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            All Markets
          </button>
          {goalMarkets.map((m) => {
            const isSelected = selectedMarket === m;
            return (
              <button
                key={m}
                onClick={() => setSelectedMarket(isSelected ? 'all' : m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-[11px] text-slate-400 font-medium">Status:</span>
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${
              selectedStatus === 'all'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedStatus('upcoming')}
            className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${
              selectedStatus === 'upcoming'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setSelectedStatus('settled')}
            className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${
              selectedStatus === 'settled'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Settled / Completed
          </button>
        </div>
      </div>

      {/* Overs/Unders Tips Feed */}
      <div className="space-y-4">
        {filteredTips.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0f1420] border border-slate-800 text-slate-400">
            <BarChart3 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No predictions found for this goal market.</p>
            <p className="text-xs text-slate-500 mt-1">Try selecting another goal category or view all.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTips.map((match) => (
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
