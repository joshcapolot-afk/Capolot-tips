import React, { useState } from 'react';
import {
  FileText,
  X,
  Trash2,
  Copy,
  Check,
  Calculator,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OddsSlipDrawer: React.FC = () => {
  const { selectedOddsSlip, toggleSlipItem, clearSlip, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [stakeUGX, setStakeUGX] = useState<number>(10000);
  const [copied, setCopied] = useState(false);

  if (selectedOddsSlip.length === 0) return null;

  const totalOdds = selectedOddsSlip.reduce((acc, curr) => acc * curr.odds, 1);
  const potentialReturnUGX = Math.round(stakeUGX * totalOdds);
  const potentialReturnUSD = (potentialReturnUGX / 3800).toFixed(2);

  const handleCopySlip = () => {
    const text = selectedOddsSlip
      .map(
        (m, i) =>
          `${i + 1}. ${m.homeTeam} vs ${m.awayTeam} (${m.league})\n   Tip: ${m.market} @ ${m.odds.toFixed(2)}`
      )
      .join('\n');
    const fullSummary = `🔥 CAPOLOT TIPS ACCUMULATOR SLIP 🔥\n\n${text}\n\nTotal Combined Odds: ${totalOdds.toFixed(
      2
    )}\nPotential Return on UGX ${stakeUGX.toLocaleString()}: UGX ${potentialReturnUGX.toLocaleString()}\nhttps://capolot-tips.com`;

    navigator.clipboard.writeText(fullSummary);
    setCopied(true);
    showToast('Accumulator ticket copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Floating Trigger Button on Mobile/Desktop */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-18 lg:bottom-6 right-4 sm:right-6 z-40 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-amber-500/30 flex items-center gap-2.5 transition-transform active:scale-95 cursor-pointer border border-amber-400"
        >
          <div className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center text-xs font-black">
            {selectedOddsSlip.length}
          </div>
          <span>Odds Slip ({totalOdds.toFixed(2)}x)</span>
        </button>
      )}

      {/* Slip Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0b0f19] border border-amber-500/40 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-200">
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-950 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ⚽
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm font-display">
                    ACCUMULATOR TICKET BUILDER
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {selectedOddsSlip.length} matches selected
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearSlip}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Clear all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Clear</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Match List */}
            <div className="p-4 overflow-y-auto divide-y divide-slate-800/80 space-y-2 flex-1 text-xs">
              {selectedOddsSlip.map((m) => (
                <div key={m.id} className="pt-2 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-bold text-slate-200 truncate">
                      {m.homeTeam} vs {m.awayTeam}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {m.league} · <span className="text-emerald-400 font-semibold">{m.market}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono font-bold text-amber-400 tabular-nums">
                      {m.odds.toFixed(2)}
                    </span>
                    <button
                      onClick={() => toggleSlipItem(m)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Odds & Payout Calculator Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">Total Combined Multi Odds:</span>
                <span className="text-xl font-black text-amber-400 tabular-nums">
                  {totalOdds.toFixed(2)}x
                </span>
              </div>

              {/* Stake input */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-400">Stake (UGX):</span>
                <input
                  type="number"
                  step="1000"
                  min="1000"
                  value={stakeUGX}
                  onChange={(e) => setStakeUGX(Math.max(1000, parseInt(e.target.value) || 1000))}
                  className="w-28 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-right font-mono font-bold text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Potential return */}
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-300">Est. Potential Return:</span>
                <div className="text-right">
                  <div className="font-black text-emerald-400 text-base tabular-nums">
                    UGX {potentialReturnUGX.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">approx. ${potentialReturnUSD} USD</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopySlip}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Slip Copied!' : 'Copy Accumulator Ticket'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
