import React from 'react';
import { Phone, Shield, ShieldAlert, Crown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, openPaymentModal, setIsAdminMode, setIsAdminModalOpen } = useApp();

  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-[#06080e] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm">
                ⚽
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-slate-100">
                CAPOLOT <span className="text-amber-400">TIPS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Professional football match predictions, 71% verified win rate, VIP bankers, HT/FT combos, and correct scores analysis.
            </p>
            <div className="pt-1">
              <button
                onClick={() => openPaymentModal('weekly')}
                className="flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>VIP Hotline: Tap to Reveal & Copy</span>
              </button>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs mb-3 font-display">
              Prediction Markets
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('ordinary'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Ordinary Daily Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('vip'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 text-amber-300 font-semibold"
                >
                  <Crown className="w-3 h-3 text-amber-400" /> VIP High Roller Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('htft'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  HT/FT Predictions
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('overs_unders'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Overs & Unders Goals
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('correct_score'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Correct Scores
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('single'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Single Tips (Banker)
                </button>
              </li>
            </ul>
          </div>

          {/* VIP & Payments */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs mb-3 font-display">
              VIP & Payments
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => openPaymentModal('daily')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Daily VIP Pass ($5 / UGX 15,000)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPaymentModal('weekly')}
                  className="hover:text-amber-400 transition-colors cursor-pointer font-bold text-amber-300"
                >
                  Weekly VIP Super Plan ($20 / UGX 60,000)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPaymentModal('monthly')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Monthly VIP Master ($50 / UGX 160,000)
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => openPaymentModal('weekly')}
                  className="text-amber-400 hover:text-amber-300 text-[11px] underline cursor-pointer"
                >
                  Tap to Reveal Payment Number &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Responsible Gaming Notice */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs mb-3 font-display flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Responsible Gaming 18+</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              CAPOLOT TIPS provides analytical football predictions and statistics for informational and entertainment purposes only. Sports betting involves financial risk. Never wager money you cannot afford to lose.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsAdminMode(true);
                  setIsAdminModalOpen(true);
                }}
                className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <Shield className="w-3 h-3" />
                <span>Admin Login Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} CAPOLOT TIPS. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Verified 71% Win Rate Syndicate</span>
            <span>·</span>
            <span>Kampala, Uganda</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
