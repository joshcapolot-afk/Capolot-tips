import React, { useState } from 'react';
import { Flame, Filter, Search, Plus, Calendar, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TipCard } from './TipCard';
import { VIPMembershipCard } from './VIPMembershipCard';

export const OrdinaryTipsSection: React.FC = () => {
  const {
    predictions,
    isAdminMode,
    setIsAdminModalOpen,
    setEditingPrediction
  } = useApp();

  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<'all' | 'today' | 'upcoming' | 'settled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Ordinary Tips
  const ordinaryTips = predictions.filter((p) => p.category === 'ordinary');

  const filteredTips = ordinaryTips.filter((item) => {
    // Search match
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTeams =
        item.homeTeam.toLowerCase().includes(q) ||
        item.awayTeam.toLowerCase().includes(q) ||
        item.league.toLowerCase().includes(q);
      if (!matchTeams) return false;
    }

    // League match
    if (selectedLeague !== 'all' && item.league !== selectedLeague) {
      return false;
    }

    // Market match
    if (selectedMarket !== 'all') {
      if (selectedMarket === '1X2' && !item.market.toLowerCase().includes('win') && !item.market.toLowerCase().includes('draw')) {
        return false;
      }
      if (selectedMarket === 'over' && !item.market.toLowerCase().includes('over')) {
        return false;
      }
      if (selectedMarket === 'btts' && !item.market.toLowerCase().includes('btts') && !item.market.toLowerCase().includes('both teams')) {
        return false;
      }
    }

    // Date / Status match
    if (selectedDate === 'upcoming' && item.status !== 'upcoming') return false;
    if (selectedDate === 'settled' && item.status === 'upcoming') return false;

    return true;
  });

  const availableLeagues = Array.from(new Set(ordinaryTips.map((t) => t.league)));

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Open For All Registered Users
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-emerald-400 font-semibold">100% Free Access</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-display tracking-tight">
                ORDINARY DAILY TIPS
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Daily curated predictions covering Home Win, Draw, Away Win, Over 2.5 Goals, and Both Teams to Score with tactical justifications.
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
              <span>Add Ordinary Tip</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-[#0f1420] border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search team, league or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Quick Date Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs overflow-x-auto">
            <button
              onClick={() => setSelectedDate('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedDate === 'all'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Matches
            </button>
            <button
              onClick={() => setSelectedDate('upcoming')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedDate === 'upcoming'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setSelectedDate('settled')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedDate === 'settled'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Settled Results
            </button>
          </div>
        </div>

        {/* League and Market Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-[11px] text-slate-400 font-medium">Market:</span>
          <button
            onClick={() => setSelectedMarket('all')}
            className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer ${
              selectedMarket === 'all'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            All Markets
          </button>
          <button
            onClick={() => setSelectedMarket('1X2')}
            className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer ${
              selectedMarket === '1X2'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            1X2 (Match Winner)
          </button>
          <button
            onClick={() => setSelectedMarket('over')}
            className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer ${
              selectedMarket === 'over'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            Over 2.5 Goals
          </button>
          <button
            onClick={() => setSelectedMarket('btts')}
            className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer ${
              selectedMarket === 'btts'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            BTTS (Both To Score)
          </button>

          {availableLeagues.length > 0 && (
            <>
              <span className="text-[11px] text-slate-400 font-medium ml-2">League:</span>
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none"
              >
                <option value="all">All Leagues</option>
                {availableLeagues.map((lg) => (
                  <option key={lg} value={lg}>{lg}</option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      {/* Predictions Feed */}
      <div className="space-y-4">
        {filteredTips.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0f1420] border border-slate-800 text-slate-400">
            <Flame className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No ordinary tips match your filter criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the league or search filter.</p>
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
