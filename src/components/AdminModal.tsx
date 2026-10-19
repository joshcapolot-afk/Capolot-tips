import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Shield,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit2,
  Trash2,
  Users,
  RotateCcw,
  Sparkles,
  Trophy
} from 'lucide-react';
import { MatchPrediction, PredictionCategory, MatchStatus } from '../types';
import { useApp } from '../context/AppContext';

export const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    predictions,
    addPrediction,
    updatePrediction,
    deletePrediction,
    settleMatch,
    resetPredictionsToDefault,
    editingPrediction,
    setEditingPrediction,
    transactions,
    approveTransaction,
    rejectTransaction,
    subscription,
    activateVIP,
    cancelVIP
  } = useApp();

  const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'settle' | 'payments'>('manage');

  // Form State
  const [formData, setFormData] = useState({
    category: 'ordinary' as PredictionCategory,
    league: 'Premier League',
    leagueCountry: 'England',
    homeTeam: '',
    awayTeam: '',
    matchDate: new Date().toISOString().split('T')[0],
    kickoffTime: '20:00',
    market: 'Home Win',
    odds: 1.75,
    confidence: 85,
    explanation: '',
    predictedScore: '2-1',
    predictedHTScore: '1-0',
    isVIPOnly: false,
    status: 'upcoming' as MatchStatus
  });

  // When editing, populate form
  useEffect(() => {
    if (editingPrediction) {
      setFormData({
        category: editingPrediction.category,
        league: editingPrediction.league,
        leagueCountry: editingPrediction.leagueCountry || '',
        homeTeam: editingPrediction.homeTeam,
        awayTeam: editingPrediction.awayTeam,
        matchDate: editingPrediction.matchDate,
        kickoffTime: editingPrediction.kickoffTime,
        market: editingPrediction.market,
        odds: editingPrediction.odds,
        confidence: editingPrediction.confidence,
        explanation: editingPrediction.explanation,
        predictedScore: editingPrediction.predictedScore || '',
        predictedHTScore: editingPrediction.predictedHTScore || '',
        isVIPOnly: editingPrediction.isVIPOnly,
        status: editingPrediction.status
      });
      setActiveTab('add');
    }
  }, [editingPrediction]);

  if (!isAdminModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.homeTeam || !formData.awayTeam || !formData.market) {
      alert('Please fill in home team, away team, and market.');
      return;
    }

    if (editingPrediction) {
      updatePrediction(editingPrediction.id, {
        ...formData,
        odds: Number(formData.odds),
        confidence: Number(formData.confidence)
      });
      setEditingPrediction(null);
    } else {
      addPrediction({
        ...formData,
        odds: Number(formData.odds),
        confidence: Number(formData.confidence)
      });
    }

    // Reset
    setFormData({
      category: 'ordinary',
      league: 'Premier League',
      leagueCountry: 'England',
      homeTeam: '',
      awayTeam: '',
      matchDate: new Date().toISOString().split('T')[0],
      kickoffTime: '20:00',
      market: 'Home Win',
      odds: 1.75,
      confidence: 85,
      explanation: '',
      predictedScore: '2-1',
      predictedHTScore: '1-0',
      isVIPOnly: false,
      status: 'upcoming'
    });
    setActiveTab('manage');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b0f19] border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-display">
                CAPOLOT TIPS — ADMINISTRATOR PORTAL
              </h2>
              <p className="text-xs text-slate-400">
                Manage predictions, publish VIP packages, settle results, and verify payments
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsAdminModalOpen(false);
              setEditingPrediction(null);
            }}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'manage'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Predictions ({predictions.length})
          </button>
          <button
            onClick={() => {
              setEditingPrediction(null);
              setActiveTab('add');
            }}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{editingPrediction ? 'Edit Tip' : 'Add New Tip'}</span>
          </button>
          <button
            onClick={() => setActiveTab('settle')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'settle'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Settle Match Scores</span>
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'payments'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>VIP Subscribers & Payments</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 max-h-[72vh] overflow-y-auto">
          
          {/* TAB 1: MANAGE PREDICTIONS */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-semibold text-slate-400">
                  Published Predictions Database ({predictions.length} fixtures)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetPredictionsToDefault}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Default Fixtures</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingPrediction(null);
                      setActiveTab('add');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Tip</span>
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
                {predictions.map((p) => (
                  <div key={p.id} className="p-3.5 flex items-center justify-between gap-3 text-xs hover:bg-slate-900/40">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="font-semibold text-amber-400 uppercase">{p.category}</span>
                        <span>·</span>
                        <span>{p.league}</span>
                        <span>·</span>
                        <span>{p.matchDate} {p.kickoffTime}</span>
                        {p.isVIPOnly && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            VIP
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-slate-200 text-sm mt-0.5 truncate">
                        {p.homeTeam} vs {p.awayTeam}
                      </div>
                      <div className="text-slate-400 mt-0.5">
                        <span className="text-emerald-400 font-semibold">{p.market}</span> @ <span className="text-amber-400 font-bold">{p.odds.toFixed(2)}</span>
                        {p.predictedScore && <span className="ml-2 text-slate-500">Exp: {p.predictedScore}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                        p.status === 'won' ? 'bg-emerald-500/20 text-emerald-400' :
                        p.status === 'lost' ? 'bg-rose-500/20 text-rose-400' :
                        p.status === 'void' ? 'bg-slate-700/50 text-slate-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {p.status} {p.finalScore ? `(${p.finalScore})` : ''}
                      </span>

                      <button
                        onClick={() => {
                          setEditingPrediction(p);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                        title="Edit tip"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => deletePrediction(p.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 cursor-pointer"
                        title="Delete tip"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ADD / EDIT PREDICTION */}
          {activeTab === 'add' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                  {editingPrediction ? 'Edit Football Match Tip' : 'Publish New Football Prediction'}
                </h3>
                {editingPrediction && (
                  <button
                    type="button"
                    onClick={() => setEditingPrediction(null)}
                    className="text-xs text-amber-400 hover:underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as PredictionCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="ordinary">Ordinary Tips</option>
                    <option value="vip">VIP Tips</option>
                    <option value="htft">HT/FT</option>
                    <option value="overs_unders">Overs/Unders</option>
                    <option value="correct_score">Correct Scores</option>
                    <option value="single">Single Tips</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    League *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.league}
                    onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                    placeholder="e.g. Premier League"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.leagueCountry}
                    onChange={(e) => setFormData({ ...formData, leagueCountry: e.target.value })}
                    placeholder="e.g. England"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Home Team *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.homeTeam}
                    onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                    placeholder="e.g. Arsenal"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Away Team *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.awayTeam}
                    onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                    placeholder="e.g. Chelsea"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Match Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.matchDate}
                    onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kickoff Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.kickoffTime}
                    onChange={(e) => setFormData({ ...formData, kickoffTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Odds (Decimal) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1.01"
                    required
                    value={formData.odds}
                    onChange={(e) => setFormData({ ...formData, odds: parseFloat(e.target.value) || 1.5 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Confidence (%) *
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="99"
                    required
                    value={formData.confidence}
                    onChange={(e) => setFormData({ ...formData, confidence: parseInt(e.target.value) || 85 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Market Prediction *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.market}
                    onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                    placeholder="e.g. Home Win, Over 2.5, 1/1"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Predicted Full-Time Score
                  </label>
                  <input
                    type="text"
                    value={formData.predictedScore}
                    onChange={(e) => setFormData({ ...formData, predictedScore: e.target.value })}
                    placeholder="e.g. 2-1"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Predicted Half-Time Score (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.predictedHTScore}
                    onChange={(e) => setFormData({ ...formData, predictedHTScore: e.target.value })}
                    placeholder="e.g. 1-0"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tactical & Statistical Explanation
                </label>
                <textarea
                  rows={3}
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  placeholder="Provide brief statistical reasoning, team form, injury updates, or head-to-head records..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* VIP Checkbox */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <input
                  type="checkbox"
                  id="isVIPOnly"
                  checked={formData.isVIPOnly}
                  onChange={(e) => setFormData({ ...formData, isVIPOnly: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700"
                />
                <label htmlFor="isVIPOnly" className="text-xs font-bold text-amber-300 cursor-pointer flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  VIP Only Match (Lock for free punters, only visible to active VIP subscribers)
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('manage')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  {editingPrediction ? 'Save Changes' : 'Publish Prediction'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: SETTLE MATCHES */}
          {activeTab === 'settle' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Input the actual final match score and mark the tip as WON, LOST, or VOID.
              </div>

              <div className="space-y-3">
                {predictions.map((p) => {
                  const [tempScore, setTempScore] = useState(p.finalScore || p.predictedScore || '2-1');
                  return (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-slate-200 text-sm">
                          {p.homeTeam} vs {p.awayTeam}
                        </div>
                        <div className="text-slate-400">
                          {p.league} · Tip: <span className="text-amber-400 font-semibold">{p.market}</span> (@{p.odds})
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-slate-500">Final Score:</span>
                          <input
                            type="text"
                            value={tempScore}
                            onChange={(e) => setTempScore(e.target.value)}
                            placeholder="e.g. 2-1"
                            className="w-16 px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-center text-xs font-bold text-slate-100"
                          />
                        </div>

                        <button
                          onClick={() => settleMatch(p.id, tempScore, 'won')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Won</span>
                        </button>

                        <button
                          onClick={() => settleMatch(p.id, tempScore, 'lost')}
                          className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Lost</span>
                        </button>

                        <button
                          onClick={() => settleMatch(p.id, tempScore, 'void')}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                        >
                          Void
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: VIP SUBSCRIBERS & PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-5">
              {/* Current App User VIP State */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                    Current App User Subscription
                  </span>
                  <div className="text-sm font-semibold text-slate-200 mt-1">
                    Status: {subscription.isVIP ? (
                      <span className="text-emerald-400 font-bold">ACTIVE VIP ({subscription.planName})</span>
                    ) : (
                      <span className="text-slate-400">Regular Free User</span>
                    )}
                  </div>
                  {subscription.expiresAt && (
                    <div className="text-xs text-slate-400 mt-0.5">
                      Expires: {new Date(subscription.expiresAt).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {subscription.isVIP ? (
                    <button
                      onClick={cancelVIP}
                      className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs font-semibold cursor-pointer"
                    >
                      Revoke VIP
                    </button>
                  ) : (
                    <button
                      onClick={() => activateVIP('weekly', 'ADMIN-GRANT', 'VIP-SUBSCRIBER')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
                    >
                      Grant VIP (Weekly Pass)
                    </button>
                  )}
                </div>
              </div>

              {/* Incoming Transaction Verification Requests */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Incoming VIP Payment Submissions & Verifications
                </h3>

                {transactions.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 border border-slate-800 rounded-2xl">
                    No payment claims recorded yet.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
                            <span>{tx.planName}</span>
                            <span className="text-amber-400 tabular-nums">
                              UGX {tx.amountUGX.toLocaleString()} (${tx.amountUSD})
                            </span>
                          </div>
                          <div className="text-slate-400 text-xs mt-0.5 space-x-2">
                            <span>Sender: <strong className="text-slate-300">{tx.senderPhone}</strong></span>
                            <span>·</span>
                            <span>Ref: <strong className="text-amber-300 font-mono">{tx.transactionRef}</strong></span>
                            <span>·</span>
                            <span>Method: <strong className="text-slate-300 uppercase">{tx.paymentMethod}</strong></span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1">
                            {new Date(tx.createdAt).toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {tx.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => approveTransaction(tx.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                              >
                                Approve & Unlock VIP
                              </button>
                              <button
                                onClick={() => rejectTransaction(tx.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-medium transition-colors cursor-pointer"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                              tx.status === 'approved'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}>
                              {tx.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
