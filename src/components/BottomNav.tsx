import React from 'react';
import { Home, Flame, Crown, Clock, Target, CheckSquare } from 'lucide-react';
import { PredictionCategory } from '../types';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: PredictionCategory | 'home'; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'ordinary', label: 'Ordinary', icon: <Flame className="w-5 h-5" /> },
    { id: 'vip', label: 'VIP Tips', icon: <Crown className="w-5 h-5" /> },
    { id: 'htft', label: 'HT/FT', icon: <Clock className="w-5 h-5" /> },
    { id: 'correct_score', label: 'Scores', icon: <Target className="w-5 h-5" /> }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080b11]/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 safe-area-bottom">
      <div className="grid grid-cols-5 items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isVIP = tab.id === 'vip';
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer min-h-[44px] ${
                isActive
                  ? isVIP
                    ? 'text-amber-400 font-bold'
                    : 'text-amber-400 font-bold'
                  : isVIP
                  ? 'text-amber-400/70 hover:text-amber-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {isVIP && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-[64px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
