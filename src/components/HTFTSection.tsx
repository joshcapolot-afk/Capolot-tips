import React, { useState } from 'react';
import { Clock, Filter, Sparkles, TrendingUp, ShieldAlert, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TipCard } from './TipCard';
import { VIPMembershipCard } from './VIPMembershipCard';
import { HTFTMarket } from '../types';

export const HTFTSection: React.FC = () => {
  const {
    predictions,
    isAdminMode,
    setIsAdminModalOpen,
    setEditingPrediction
  } = useApp();

  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'upcoming' | 'settled'>('all');

  const allHTFTMarkets: { market: HTFTMarket; code: string; desc: string }[] = [
    { market: 'Home/Home', code: '1/1', desc: 'Home leads at HT, Home wins at FT' },
    { market: 'Home/Draw', code: '1/X', desc: 'Home leads at HT, match ends Draw' },
    { market: 'Home/Away', code: '1/2', desc: 'Home leads at HT, Away wins at FT (Turnaround)' },
    { market: 'Draw/Home', code: 'X/1', desc: 'Tied at HT, Home wins at FT' },
    { market: 'Draw/Draw', code: 'X/X', desc: 'Tied at HT, Tied at FT' },
    { market: 'Draw/Away', code: 'X/2', desc: 'Tied at HT, Away wins at FT' },
    { market: 'Away/Home', code: '2/1', desc: 'Away leads at HT, Home wins at FT (Turnaround)' },
    { market: 'Away/Draw', code: '2/X', desc: 'Away leads at HT, match ends Draw' },
    { market: 'Away/Away', code: '2/2', desc: 'Away leads at HT, Away wins at FT' }
  ];

  const htftTips = predictions.filter((p) => p.category === 'htft');

  const filteredTips = htftTips.filter((item) => {
    if (selectedMarket !== 'all') {
      if (!item.market.toLowerCase().includes(selectedMarket.toLowerCase()) && item.htftMarket !== selectedMarket) {
        return false;
      }
    }
    if (selectedStatus === 'upcoming' && item.status !== 'upcoming') return false;
    if (selectedStatus === 'settled' && item.status === 'upcoming') return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  High-Yield Value Markets
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-amber-400 font-semibold">All 9 HT/FT Options</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-display tracking-tight">
                HALF TIME / FULL TIME (HT/FT) PREDICTIONS
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Advanced halftime and fulltime outcome modeling. High odds selections covering Home/Home, Draw/Home, Draw/Draw, and spectacular comeback markets.
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
              <span>Add HT/FT Tip</span>
            </button>
          )}
        </div>
      </div>

      <VIPMembershipCard />

      {/* 9 HT/FT Market Matrix Explainer & Filter */}
      <div className="p-4 rounded-2xl bg-[#0f1420] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Filter by HT/FT Combination Market
          </span>
          <button
            onClick={() => setSelectedMarket('all')}
            className={`text-xs ${selectedMarket === 'all' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'} cursor-pointer`}
          >
            Show All
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
          {allHTFTMarkets.map((m) => {
            const isSelected = selectedMarket === m.market || selectedMarket === m.code;
            return (
              <button
                key={m.code}
                onClick={() => setSelectedMarket(isSelected ? 'all' : m.market)}
                className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
                title={m.desc}
              >
                <div className="text-xs font-mono font-bold">{m.code}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{m.market}</div>
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

      {/* HT/FT Tips Feed */}
      <div className="space-y-4">
        {filteredTips.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0f1420] border border-slate-800 text-slate-400">
            <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No HT/FT predictions match this filter.</p>
            <p className="text-xs text-slate-500 mt-1">Select "Show All" to browse all published halftime/fulltime tips.</p>
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
