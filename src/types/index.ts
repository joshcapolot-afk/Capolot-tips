export type PredictionCategory =
  | 'ordinary'
  | 'vip'
  | 'htft'
  | 'overs_unders'
  | 'correct_score'
  | 'single';

export type MatchStatus = 'upcoming' | 'live' | 'won' | 'lost' | 'void';

export type HTFTMarket =
  | 'Home/Home'
  | 'Home/Draw'
  | 'Home/Away'
  | 'Draw/Home'
  | 'Draw/Draw'
  | 'Draw/Away'
  | 'Away/Home'
  | 'Away/Draw'
  | 'Away/Away';

export type OversUndersMarket =
  | 'Over 0.5 Goals'
  | 'Over 1.5 Goals'
  | 'Over 2.5 Goals'
  | 'Over 3.5 Goals'
  | 'Under 1.5 Goals'
  | 'Under 2.5 Goals'
  | 'Under 3.5 Goals'
  | 'Both Teams to Score - Yes'
  | 'Both Teams to Score - No';

export interface MatchPrediction {
  id: string;
  category: PredictionCategory;
  league: string;
  leagueCountry?: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  matchDate: string; // YYYY-MM-DD
  kickoffTime: string; // HH:MM
  market: string; // e.g. "Home Win", "Over 2.5", "1/1", "2-1"
  odds: number;
  confidence: number; // percentage, e.g. 88
  explanation: string;
  predictedScore?: string;
  predictedHTScore?: string;
  htftMarket?: HTFTMarket;
  oversUndersMarket?: OversUndersMarket;
  isVIPOnly: boolean;
  status: MatchStatus;
  finalScore?: string;
  finalHTScore?: string;
  // Advanced stats for depth
  teamStats?: {
    homeRecentForm?: string[]; // ['W', 'W', 'D', 'W', 'L']
    awayRecentForm?: string[];
    homeAvgGoals?: number;
    awayAvgGoals?: number;
    h2hSummary?: string;
    bttsRate?: number;
    over25Rate?: number;
  };
}

export type VIPPlanType = 'daily' | 'weekly' | 'monthly';

export interface VIPPackage {
  id: VIPPlanType;
  name: string;
  durationLabel: string;
  durationDays: number;
  priceUSD: number;
  priceUGX: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface UserSubscription {
  isVIP: boolean;
  planId?: VIPPlanType;
  planName?: string;
  activatedAt?: string;
  expiresAt?: string; // ISO string
  transactionRef?: string;
  phoneNumber?: string;
}

export interface PaymentTransaction {
  id: string;
  planId: VIPPlanType;
  planName: string;
  amountUGX: number;
  amountUSD: number;
  senderPhone: string;
  transactionRef: string;
  paymentMethod: 'mtn_momo' | 'airtel_money' | 'card_other';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface PredictionFilter {
  category: PredictionCategory | 'all';
  dateFilter: 'all' | 'today' | 'tomorrow' | 'past';
  status: 'all' | 'pending' | 'settled';
  searchQuery: string;
  league: string;
}
