/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeSection } from './components/HomeSection';
import { OrdinaryTipsSection } from './components/OrdinaryTipsSection';
import { VIPTipsSection } from './components/VIPTipsSection';
import { HTFTSection } from './components/HTFTSection';
import { OversUndersSection } from './components/OversUndersSection';
import { CorrectScoresSection } from './components/CorrectScoresSection';
import { SingleTipsSection } from './components/SingleTipsSection';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { OddsSlipDrawer } from './components/OddsSlipDrawer';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, toasts, dismissToast } = useApp();

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection />;
      case 'ordinary':
        return <OrdinaryTipsSection />;
      case 'vip':
        return <VIPTipsSection />;
      case 'htft':
        return <HTFTSection />;
      case 'overs_unders':
        return <OversUndersSection />;
      case 'correct_score':
        return <CorrectScoresSection />;
      case 'single':
        return <SingleTipsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080b11] text-slate-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 lg:pb-8">
        {renderActiveSection()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Betslip Drawer */}
      <OddsSlipDrawer />

      {/* In-App VIP Payment Modal */}
      <PaymentModal />

      {/* Administrator Portal Modal */}
      <AdminModal />

      {/* Mobile Ergonomic Bottom Tab Navigation */}
      <BottomNav />

      {/* Toast Notifications Stack */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-2xl border backdrop-blur-md flex items-start justify-between gap-3 text-xs animate-in slide-in-from-right duration-250 ${
              toast.type === 'success'
                ? 'bg-[#0b1b14]/90 border-emerald-500/40 text-emerald-200'
                : toast.type === 'warning'
                ? 'bg-[#21160a]/90 border-amber-500/40 text-amber-200'
                : toast.type === 'error'
                ? 'bg-[#220a0d]/90 border-rose-500/40 text-rose-200'
                : 'bg-[#0f1422]/90 border-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />}
              <span className="leading-snug font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
