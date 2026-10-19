import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lock,
  Sparkles,
  Edit2,
  Check,
  Trash2,
  Plus,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { MatchPrediction } from '../types';
import { useApp } from '../context/AppContext';

interface TipCardProps {
  prediction: MatchPrediction;
  onEdit?: (pred: MatchPrediction) => void;
  onSettle?: (pred: MatchPrediction) => void;
}

export const TipCard: React.FC<TipCardProps> = ({
  prediction,
  onEdit,
  onSettle
}) => {
  const { subscription, openPaymentModal, isAdminMode, deletePrediction, selectedOddsSlip, toggleSlipItem } = useApp();
  const [showAnalysis, setShowAnalysis] = useState(false);

  const isLocked = prediction.isVIPOnly && !subscription.isVIP;
  const isSelectedInSlip = selectedOddsSlip.some((item) => item.id === prediction.id);

  // Status badge styling
  const renderStatus = () => {
    if (prediction.status === 'won') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 tabular-nums">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>WON ({prediction.finalScore || 'Settled'})</span>
        </span>
      );
    }
    if (prediction.status === 'lost') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 tabular-nums">
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>LOST ({prediction.finalScore || 'Settled'})</span>
        </span>
      );
    }
    if (prediction.status === 'void') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>VOID</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400/90">
        <Clock className="w-3.5 h-3.5" />
        <span>PENDING</span>
      </span>
    );
  };

  return (
    <div
      className={`relative rounded-2xl bg-[#0f1420]/90 border transition-all duration-200 overflow-hidden ${
        prediction.isVIPOnly
          ? 'border-amber-500/30 hover:border-amber-500/50 shadow-lg shadow-amber-950/20'
          : 'border-slate-800 hover:border-slate-700 shadow-md shadow-black/40'
      }`}
    >
      {/* Top Meta Zone */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0d14]/70 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-400 truncate">
          <span className="font-semibold text-slate-300 truncate">{prediction.league}</span>
          {prediction.leagueCountry && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 text-[11px]">{prediction.leagueCountry}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-slate-400 text-[11px]">
            <Calendar className="w-3 h-3 text-slate-500" />
            <span>{prediction.matchDate}</span>
            <span className="text-slate-600">·</span>
            <span>{prediction.kickoffTime}</span>
          </div>

          {prediction.isVIPOnly && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-2.5 h-2.5" />
              VIP
            </span>
          )}
        </div>
      </div>

      {/* Main Fixture Zone */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-12 items-center gap-3">
          {/* Teams column */}
          <div className="col-span-8 sm:col-span-8 space-y-2">
            {/* Home Team */}
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-amber-400 shrink-0">
                {prediction.homeTeam.substring(0, 2).toUpperCase()}
              </div>
              <span className="font-semibold text-slate-100 text-sm sm:text-base tracking-tight truncate">
                {prediction.homeTeam}
              </span>
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-emerald-400 shrink-0">
                {prediction.awayTeam.substring(0, 2).toUpperCase()}
              </div>
              <span className="font-semibold text-slate-100 text-sm sm:text-base tracking-tight truncate">
                {prediction.awayTeam}
              </span>
            </div>
          </div>

          {/* Odds & Confidence badge */}
          <div className="col-span-4 sm:col-span-4 text-right flex flex-col items-end justify-center">
            {isLocked ? (
              <div className="flex flex-col items-end">
                <span className="text-xs text-amber-400/80 font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" /> VIP Odds
                </span>
                <span className="text-lg font-bold text-slate-600 blur-[3px] select-none">
                  2.45
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  {prediction.confidence}% conf.
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-end">
                <span className="text-[11px] text-slate-400">Decimal Odds</span>
                <span className="text-xl sm:text-2xl font-extrabold text-amber-400 tabular-nums">
                  {prediction.odds.toFixed(2)}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium tabular-nums">
                  {prediction.confidence}% conf.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Prediction Market Ribbon */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          {isLocked ? (
            <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-amber-950/30 px-3 py-1.5 rounded-lg border border-amber-500/20 w-full sm:w-auto">
              <Lock className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span className="font-medium">Market locked for VIP members only</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide">
                TIP: {prediction.market}
              </div>

              {prediction.predictedScore && (
                <div className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold tabular-nums">
                  Exp: {prediction.predictedScore}
                </div>
              )}

              {prediction.predictedHTScore && (
                <div className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold tabular-nums">
                  HT Exp: {prediction.predictedHTScore}
                </div>
              )}
            </div>
          )}

          {/* Status or Settle Result */}
          <div className="shrink-0">{renderStatus()}</div>
        </div>

        {/* Locked Overlay CTA */}
        {isLocked && (
          <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/40 border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="text-left">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Premium VIP Pick</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                Unlock high-value odds, correct score projections & tactical analysis.
              </p>
            </div>
            <button
              onClick={() => openPaymentModal('weekly')}
              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition-all shrink-0 active:scale-95 cursor-pointer"
            >
              Unlock VIP
            </button>
          </div>
        )}

        {/* Collapsible Tactical Analysis */}
        {!isLocked && (
          <div className="mt-3">
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="w-full flex items-center justify-between py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                {showAnalysis ? 'Hide Statistical Analysis' : 'Show Match Analysis & Stats'}
              </span>
              {showAnalysis ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAnalysis && (
              <div className="mt-2 p-3 rounded-xl bg-[#090c13] border border-slate-800 text-xs text-slate-300 space-y-2 animate-in fade-in duration-200">
                <p className="leading-relaxed text-slate-300 font-normal">
                  {prediction.explanation}
                </p>

                {prediction.teamStats && (
                  <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    {prediction.teamStats.homeAvgGoals && (
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-500 block">Home Avg Gls</span>
                        <span className="font-bold text-slate-200 tabular-nums">
                          {prediction.teamStats.homeAvgGoals}
                        </span>
                      </div>
                    )}
                    {prediction.teamStats.awayAvgGoals && (
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-500 block">Away Avg Gls</span>
                        <span className="font-bold text-slate-200 tabular-nums">
                          {prediction.teamStats.awayAvgGoals}
                        </span>
                      </div>
                    )}
                    {prediction.teamStats.bttsRate && (
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-500 block">BTTS Hit Rate</span>
                        <span className="font-bold text-emerald-400 tabular-nums">
                          {prediction.teamStats.bttsRate}%
                        </span>
                      </div>
                    )}
                    {prediction.teamStats.over25Rate && (
                      <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                        <span className="text-slate-500 block">Over 2.5 Rate</span>
                        <span className="font-bold text-amber-400 tabular-nums">
                          {prediction.teamStats.over25Rate}%
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {prediction.category === 'correct_score' && (
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-400/80 pt-1">
                    <ShieldAlert className="w-3 h-3 shrink-0" />
                    <span>Exact score prediction based on xG models. Play responsibly.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Slip Builder Toggle & Admin Bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
          {!isLocked ? (
            <button
              onClick={() => toggleSlipItem(prediction)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                isSelectedInSlip
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {isSelectedInSlip ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Added to Acca</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Slip</span>
                </>
              )}
            </button>
          ) : (
            <div className="text-[11px] text-slate-500">CAPOLOT VIP Verified</div>
          )}

          {/* Admin Controls */}
          {isAdminMode && (
            <div className="flex items-center gap-1.5">
              {onSettle && (
                <button
                  onClick={() => onSettle(prediction)}
                  className="px-2 py-1 rounded bg-emerald-900/40 hover:bg-emerald-800/50 text-emerald-300 text-[11px] font-medium border border-emerald-500/30 transition-colors cursor-pointer"
                  title="Settle match score & result"
                >
                  Settle
                </button>
              )}
              {onEdit && (
                <button
                  onClick={() => onEdit(prediction)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Edit prediction"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => deletePrediction(prediction.id)}
                className="p-1 rounded bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
                title="Delete prediction"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
