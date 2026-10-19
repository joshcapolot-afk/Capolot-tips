import React from 'react';
import {
  Flame,
  Crown,
  Clock,
  Target,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Phone,
  BarChart3,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { PredictionCategory } from '../types';
import { useApp } from '../context/AppContext';
import { TipCard } from './TipCard';
import { VIPMembershipCard } from './VIPMembershipCard';
import { VIP_CONTACT_PHONE, VIP_CONTACT_FORMATTED } from '../data/mockPredictions';

import heroStadiumImg from '../assets/images/capolot_hero_stadium_1792416674131.jpg';

export const HomeSection: React.FC = () => {
  const { predictions, setActiveTab, openPaymentModal, setEditingPrediction, setIsAdminModalOpen } = useApp();

  const categories: {
    id: PredictionCategory;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    badge?: string;
    color: string;
  }[] = [
    {
      id: 'ordinary',
      title: 'Ordinary Tips',
      subtitle: 'Daily free 1X2, BTTS & Over 2.5',
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/30 hover:border-amber-500/60'
    },
    {
      id: 'vip',
      title: 'VIP Tips',
      subtitle: 'High-confidence bankers & accas',
      icon: <Crown className="w-5 h-5 text-amber-300" />,
      badge: '71% Win Rate',
      color: 'border-amber-500/50 hover:border-amber-400 bg-amber-950/20'
    },
    {
      id: 'htft',
      title: 'HT/FT Predictions',
      subtitle: 'All 9 Half Time / Full Time markets',
      icon: <Clock className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/30 hover:border-emerald-500/60'
    },
    {
      id: 'overs_unders',
      title: 'Overs / Unders',
      subtitle: 'Over 0.5 to 3.5 & BTTS analysis',
      icon: <BarChart3 className="w-5 h-5 text-sky-400" />,
      color: 'border-sky-500/30 hover:border-sky-500/60'
    },
    {
      id: 'correct_score',
      title: 'Correct Scores',
      subtitle: 'Exact match scorelines (1-0, 2-1)',
      icon: <Target className="w-5 h-5 text-rose-400" />,
      badge: 'Big Odds',
      color: 'border-rose-500/30 hover:border-rose-500/60'
    },
    {
      id: 'single',
      title: 'Single Tips',
      subtitle: 'Daily Banker & Single Pick of the Day',
      icon: <Award className="w-5 h-5 text-emerald-300" />,
      badge: 'Single Focus',
      color: 'border-emerald-500/40 hover:border-emerald-400'
    }
  ];

  // Filters for home widgets - show full fixture feed
  const todaysFixtures = predictions.filter((p) => p.status === 'upcoming').slice(0, 6);
  const freeDailyTips = predictions.filter((p) => !p.isVIPOnly && p.status === 'upcoming').slice(0, 4);
  const vipPreviewTips = predictions.filter((p) => p.isVIPOnly).slice(0, 2);
  const recentResults = predictions.filter((p) => p.status === 'won' || p.status === 'lost').slice(0, 4);

  // Performance stats
  const totalSettled = predictions.filter((p) => p.status === 'won' || p.status === 'lost');
  const wonCount = predictions.filter((p) => p.status === 'won').length;
  const winRate = totalSettled.length > 0 ? ((wonCount / totalSettled.length) * 100).toFixed(1) : '71.0';

  return (
    <div className="space-y-8 pb-12">
      
      {/* HERO SECTION with Stadium Artwork */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-[#080c14] shadow-2xl">
        {/* Background Image with Dark Gradient Scrim */}
        <div className="absolute inset-0 z-0 bg-[#090d16]">
          <img
            src={heroStadiumImg}
            alt="Football Stadium"
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            className="w-full h-full object-cover object-center opacity-35 mix-blend-luminosity scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080c14] via-[#080c14]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-5 py-8 sm:px-8 sm:py-12 md:py-16 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Smart Football Predictions & VIP Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] text-balance">
            MASTER THE PITCH WITH <span className="text-gold-gradient">CAPOLOT TIPS</span>
          </h1>

          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Your premier destination for verified daily football match predictions, deep statistical analysis, high-odds HT/FT picks, exact correct scores, and exclusive VIP bankers.
          </p>

          {/* Quick Stats Strip */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Win Rate</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums">
                {winRate}%
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Daily Odds</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">
                3.50+
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">VIP Support</span>
              <span className="text-xl sm:text-2xl font-black text-slate-100 font-display">
                24/7
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openPaymentModal('weekly')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Crown className="w-4 h-4 text-slate-950 fill-current" />
              <span>Unlock VIP Access</span>
            </button>

            <button
              onClick={() => setActiveTab('ordinary')}
              className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all cursor-pointer flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Explore Free Tips</span>
            </button>
          </div>
        </div>
      </div>

      {/* User VIP Membership Status Bar */}
      <VIPMembershipCard />

      {/* 1. PREDICTION CATEGORIES GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-display tracking-wide">
              EXPLORE PREDICTION MARKETS
            </h2>
            <p className="text-xs text-slate-400">
              Select a specialized football prediction category to view detailed analysis
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`p-4 rounded-2xl bg-[#0f1420]/80 border ${cat.color} transition-all duration-200 cursor-pointer hover:shadow-lg flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    {cat.icon}
                  </div>
                  {cat.badge && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-100 text-sm sm:text-base group-hover:text-amber-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {cat.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
                <span className="font-medium text-[11px]">View tips</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. TODAY'S FOOTBALL FIXTURES & UPCOMING MATCHES */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-display tracking-wide">
              TODAY'S FOOTBALL FIXTURES
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('ordinary')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({todaysFixtures.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todaysFixtures.map((match) => (
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
      </div>

      {/* 3. VIP TIPS PREVIEW SECTION */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-950/40 via-[#0d121e] to-[#080b12] border border-amber-500/40 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Crown className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block">
                Exclusive Premium Picks
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-display tracking-tight">
                TODAY'S VIP TIPS PREVIEW
              </h2>
            </div>
          </div>

          <button
            onClick={() => openPaymentModal('weekly')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Unlock All VIP Selections</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vipPreviewTips.map((match) => (
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
      </div>

      {/* 4. RECENT PREDICTION RESULTS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-display tracking-wide">
              RECENT PREDICTION RESULTS
            </h2>
          </div>
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Verified Results</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentResults.map((match) => (
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
      </div>

      {/* 5. IN-APP PAYMENTS CALLOUT BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#131929] to-slate-900 border border-amber-500/30 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Official Mobile Money VIP Activation</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              READY FOR 71% VERIFIED WINNING SLIPS?
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Subscribe to CAPOLOT VIP via MTN Mobile Money or Airtel Money with simple USSD guides. Packages start at only $5 (UGX 15,000) for instant 24-hour access or $20 (UGX 60,000) for 7 full days of winning tickets.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              onClick={() => openPaymentModal('weekly')}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 fill-current" />
              <span>Join VIP Package Now</span>
            </button>

            <button
              onClick={() => openPaymentModal('weekly')}
              className="w-full py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tap to Reveal Payment Number &rarr;</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
