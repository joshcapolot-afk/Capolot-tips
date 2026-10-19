import React, { useState } from 'react';
import {
  Crown,
  Shield,
  Menu,
  X,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { PredictionCategory } from '../types';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    subscription,
    openPaymentModal,
    isAdminMode,
    setIsAdminMode,
    setIsAdminModalOpen,
    getRemainingVIPTime
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const remaining = getRemainingVIPTime();

  const navLinks: { id: PredictionCategory | 'home'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'ordinary', label: 'Ordinary Tips' },
    { id: 'vip', label: 'VIP Tips' },
    { id: 'htft', label: 'HT/FT' },
    { id: 'overs_unders', label: 'Overs/Unders' },
    { id: 'correct_score', label: 'Correct Scores' },
    { id: 'single', label: 'Single Tips' }
  ];

  const handleNavClick = (tab: PredictionCategory | 'home') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080b11]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 lg:gap-8">
          
          {/* ZONE 1: Single element brand wordmark */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-lg">
              ⚽
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-slate-100 flex items-center gap-1.5 leading-none">
                CAPOLOT <span className="text-amber-400">TIPS</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
                Football Intelligence
              </span>
            </div>
          </div>

          {/* ZONE 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const isVIPLink = link.id === 'vip';
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-400 font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isVIPLink && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: 1 primary action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* VIP Status or Upgrade CTA */}
            {subscription.isVIP ? (
              <button
                onClick={() => openPaymentModal(subscription.planId)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
                title={`VIP active until ${subscription.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : ''}`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>VIP: {remaining.text}</span>
              </button>
            ) : (
              <button
                onClick={() => openPaymentModal('weekly')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
              >
                <Crown className="w-4 h-4 text-slate-950 fill-current" />
                <span>Upgrade to VIP</span>
              </button>
            )}

            {/* Admin Key Switch */}
            <button
              onClick={() => {
                if (!isAdminMode) {
                  setIsAdminMode(true);
                  setIsAdminModalOpen(true);
                } else {
                  setIsAdminModalOpen(true);
                }
              }}
              className={`p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                isAdminMode
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={isAdminMode ? 'Admin Mode Active — Click to manage tips' : 'Enable Administrator Panel'}
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d14] border-b border-slate-800 px-4 py-4 space-y-1 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="pb-3 mb-2 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>PREDICTION MARKETS</span>
            {subscription.isVIP && (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Crown className="w-3 h-3" /> VIP Active
              </span>
            )}
          </div>
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.id === 'vip' && <Crown className="w-4 h-4 text-amber-400" />}
                  {link.label}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openPaymentModal('weekly');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
            >
              <Crown className="w-4 h-4 text-slate-950 fill-current" />
              <span>Unlock VIP Access (Instant Activation)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
