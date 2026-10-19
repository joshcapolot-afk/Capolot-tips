import React, { useState } from 'react';
import { Target, ShieldAlert, Sparkles, Lock, Plus, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TipCard } from './TipCard';
import { VIPMembershipCard } from './VIPMembershipCard';

export const CorrectScoresSection: React.FC = () => {
  const {
    predictions,
    subscription,
    openPaymentModal,
    isAdminMode,
    setIsAdminModalOpen,
    setEditingPrediction
  } = useApp();

  const [activeTier, setActiveTier] = useState<'all' | 'free' | 'vip'>('all');
  const [selectedScore, setSelectedScore] = useState<string>('all');

  const scorePresets = ['1-0', '2-0', '2-1', '1-1', '0-0', '2-2', '3-1', '3-2'];

  const csTips = predictions.filter((p) => p.category === 'correct_score');

  const filteredTips = csTips.filter((item) => {
    if (activeTier === 'free' && item.isVIPOnly) return false;
    if (activeTier === 'vip' && !item.isVIPOnly) return false;
    if (selectedScore !== 'all' && item.predictedScore !== selectedScore) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Mega Odds Projections
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-amber-400 font-semibold">Free & VIP Correct Scores</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-display tracking-tight">
                CORRECT SCORES PREDICTIONS
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Exact full-time scorelines (1-0, 2-1, 1-1, 2-0, 0-0, 2-2) with expected goal (xG) metrics and high payoff multiples.
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
              <span>Add Correct Score</span>
            </button>
          )}
        </div>
      </div>

      {/* Mandatory Responsible Gaming Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3 text-xs text-amber-300">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold uppercase tracking-wide">
            IMPORTANT DISCLAIMER & NOTICE
          </strong>
          <span>
            Every scoreline shown in this section is an analytical prediction based on mathematical probability models and historical data. Football matches have unpredictable dynamics and these tips are NOT guaranteed results. Please stake responsibly. 18+ only.
          </span>
        </div>
      </div>

      <VIPMembershipCard />

      {/* Tier & Scoreline Filters */}
      <div className="p-4 rounded-2xl bg-[#0f1420] border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Free vs VIP Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTier('all')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTier === 'all'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Scores ({csTips.length})
            </button>
            <button
              onClick={() => setActiveTier('free')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTier === 'free'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Free Correct Scores
            </button>
            <button
              onClick={() => setActiveTier('vip')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                activeTier === 'vip'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                  : 'text-amber-400/80 hover:text-amber-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>VIP Exclusive Scores</span>
            </button>
          </div>

          {/* Quick Score Presets */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            <span className="text-[11px] text-slate-500 mr-1">Score:</span>
            <button
              onClick={() => setSelectedScore('all')}
              className={`px-2 py-1 rounded text-xs cursor-pointer ${
                selectedScore === 'all' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            {scorePresets.map((sc) => (
              <button
                key={sc}
                onClick={() => setSelectedScore(selectedScore === sc ? 'all' : sc)}
                className={`px-2 py-1 rounded text-xs font-mono tabular-nums cursor-pointer border ${
                  selectedScore === sc
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Correct Scores Feed */}
      <div className="space-y-4">
        {filteredTips.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0f1420] border border-slate-800 text-slate-400">
            <Target className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No correct score predictions found for this filter.</p>
            <p className="text-xs text-slate-500 mt-1">Try switching to All Scores or reset the score filter.</p>
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
