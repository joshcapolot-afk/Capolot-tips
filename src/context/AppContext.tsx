import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  MatchPrediction,
  PredictionCategory,
  UserSubscription,
  VIPPlanType,
  PaymentTransaction
} from '../types';
import {
  INITIAL_PREDICTIONS,
  VIP_PACKAGES
} from '../data/mockPredictions';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  activeTab: PredictionCategory | 'home';
  setActiveTab: (tab: PredictionCategory | 'home') => void;
  predictions: MatchPrediction[];
  addPrediction: (newPred: Omit<MatchPrediction, 'id'>) => void;
  updatePrediction: (id: string, updated: Partial<MatchPrediction>) => void;
  deletePrediction: (id: string) => void;
  settleMatch: (id: string, finalScore: string, status: 'won' | 'lost' | 'void', finalHTScore?: string) => void;
  resetPredictionsToDefault: () => void;
  
  // VIP & Subscriptions
  subscription: UserSubscription;
  activateVIP: (planId: VIPPlanType, transactionRef?: string, phone?: string) => void;
  cancelVIP: () => void;
  getRemainingVIPTime: () => { days: number; hours: number; minutes: number; isExpired: boolean; text: string };
  
  // Payment Modal
  isPaymentModalOpen: boolean;
  selectedPlanForPayment: VIPPlanType;
  openPaymentModal: (planId?: VIPPlanType) => void;
  closePaymentModal: () => void;
  
  // Transactions (User & Admin)
  transactions: PaymentTransaction[];
  submitPayment: (planId: VIPPlanType, senderPhone: string, txRef: string, method: 'mtn_momo' | 'airtel_money' | 'card_other') => void;
  approveTransaction: (txId: string) => void;
  rejectTransaction: (txId: string) => void;

  // Admin Modal
  isAdminMode: boolean;
  setIsAdminMode: (active: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  editingPrediction: MatchPrediction | null;
  setEditingPrediction: (pred: MatchPrediction | null) => void;

  // Toasts
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;

  // Selected slip / odds calculator
  selectedOddsSlip: MatchPrediction[];
  toggleSlipItem: (match: MatchPrediction) => void;
  clearSlip: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREDICTIONS = 'capolot_predictions_v2';
const STORAGE_KEY_SUB = 'capolot_user_sub_v2';
const STORAGE_KEY_TX = 'capolot_user_tx_v2';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<PredictionCategory | 'home'>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [editingPrediction, setEditingPrediction] = useState<MatchPrediction | null>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<VIPPlanType>('weekly');

  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [selectedOddsSlip, setSelectedOddsSlip] = useState<MatchPrediction[]>([]);

  // Load predictions
  const [predictions, setPredictions] = useState<MatchPrediction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREDICTIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PREDICTIONS;
  });

  // Load user subscription
  const [subscription, setSubscription] = useState<UserSubscription>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SUB);
      if (saved) {
        const parsed: UserSubscription = JSON.parse(saved);
        // Check if expired
        if (parsed.expiresAt) {
          const expTime = new Date(parsed.expiresAt).getTime();
          if (expTime > Date.now()) {
            return parsed;
          }
        }
      }
    } catch {
      // fallback
    }
    return {
      isVIP: false
    };
  });

  // Load transactions
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TX);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'tx-seed-1',
        planId: 'weekly',
        planName: 'Weekly VIP Super Plan',
        amountUGX: 60000,
        amountUSD: 20,
        senderPhone: '+256700123456',
        transactionRef: 'MP261019088',
        paymentMethod: 'airtel_money',
        status: 'approved',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ];
  });

  // Sync predictions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREDICTIONS, JSON.stringify(predictions));
    } catch (e) {
      console.error('Failed to save predictions', e);
    }
  }, [predictions]);

  // Sync subscription to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SUB, JSON.stringify(subscription));
    } catch (e) {
      console.error('Failed to save subscription', e);
    }
  }, [subscription]);

  // Sync transactions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save transactions', e);
    }
  }, [transactions]);

  // Periodically check subscription expiration
  useEffect(() => {
    const checkExpiry = () => {
      if (subscription.isVIP && subscription.expiresAt) {
        const now = Date.now();
        const exp = new Date(subscription.expiresAt).getTime();
        if (now >= exp) {
          setSubscription({
            isVIP: false
          });
          showToast('Your VIP subscription period has expired. Please renew to continue access.', 'warning');
        }
      }
    };

    checkExpiry();
    const interval = setInterval(checkExpiry, 30000); // check every 30 seconds
    return () => clearInterval(interval);
  }, [subscription]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const activateVIP = (planId: VIPPlanType, transactionRef?: string, phone?: string) => {
    const pkg = VIP_PACKAGES.find((p) => p.id === planId) || VIP_PACKAGES[0];
    const activatedAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + pkg.durationDays * 24 * 60 * 60 * 1000).toISOString();

    const newSub: UserSubscription = {
      isVIP: true,
      planId: pkg.id,
      planName: pkg.name,
      activatedAt,
      expiresAt,
      transactionRef: transactionRef || `CAP-${Math.floor(100000 + Math.random() * 900000)}`,
      phoneNumber: phone || ''
    };

    setSubscription(newSub);

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#FFFFFF', '#D97706']
      });
    } catch {
      // ignore
    }

    showToast(`🎉 VIP Activated! Welcome to ${pkg.name}. You now have full access to all VIP tips and correct scores!`, 'success');
  };

  const cancelVIP = () => {
    setSubscription({ isVIP: false });
    showToast('VIP membership deactivated.', 'info');
  };

  const getRemainingVIPTime = () => {
    if (!subscription.isVIP || !subscription.expiresAt) {
      return { days: 0, hours: 0, minutes: 0, isExpired: true, text: 'No active VIP' };
    }

    const diff = new Date(subscription.expiresAt).getTime() - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, isExpired: true, text: 'Expired' };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    let text = '';
    if (days > 0) text += `${days}d `;
    text += `${hours}h ${minutes}m left`;

    return { days, hours, minutes, isExpired: false, text };
  };

  const openPaymentModal = (planId?: VIPPlanType) => {
    if (planId) {
      setSelectedPlanForPayment(planId);
    }
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const submitPayment = (
    planId: VIPPlanType,
    senderPhone: string,
    txRef: string,
    method: 'mtn_momo' | 'airtel_money' | 'card_other'
  ) => {
    const pkg = VIP_PACKAGES.find((p) => p.id === planId) || VIP_PACKAGES[0];
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      planId,
      planName: pkg.name,
      amountUGX: pkg.priceUGX,
      amountUSD: pkg.priceUSD,
      senderPhone,
      transactionRef: txRef,
      paymentMethod: method,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Automatically approve & activate (or let admin manage)
    activateVIP(planId, txRef, senderPhone);
    closePaymentModal();
  };

  const approveTransaction = (txId: string) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === txId) {
          activateVIP(t.planId, t.transactionRef, t.senderPhone);
          return { ...t, status: 'approved' as const };
        }
        return t;
      })
    );
    showToast('Payment approved and VIP membership activated!', 'success');
  };

  const rejectTransaction = (txId: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txId ? { ...t, status: 'rejected' as const } : t))
    );
    showToast('Payment marked as rejected.', 'warning');
  };

  const addPrediction = (newPred: Omit<MatchPrediction, 'id'>) => {
    const id = `pred-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const full: MatchPrediction = { ...newPred, id };
    setPredictions((prev) => [full, ...prev]);
    showToast(`Added prediction: ${full.homeTeam} vs ${full.awayTeam}`, 'success');
  };

  const updatePrediction = (id: string, updated: Partial<MatchPrediction>) => {
    setPredictions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast('Prediction updated successfully!', 'success');
  };

  const deletePrediction = (id: string) => {
    setPredictions((prev) => prev.filter((p) => p.id !== id));
    showToast('Prediction removed.', 'info');
  };

  const settleMatch = (
    id: string,
    finalScore: string,
    status: 'won' | 'lost' | 'void',
    finalHTScore?: string
  ) => {
    setPredictions((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            finalScore,
            status,
            finalHTScore: finalHTScore || p.finalHTScore
          };
        }
        return p;
      })
    );
    showToast(`Match settled as ${status.toUpperCase()} (${finalScore})`, 'success');
  };

  const resetPredictionsToDefault = () => {
    setPredictions(INITIAL_PREDICTIONS);
    showToast('Reset predictions to realistic default fixture database.', 'info');
  };

  const toggleSlipItem = (match: MatchPrediction) => {
    setSelectedOddsSlip((prev) => {
      const exists = prev.some((item) => item.id === match.id);
      if (exists) {
        return prev.filter((item) => item.id !== match.id);
      } else {
        return [...prev, match];
      }
    });
  };

  const clearSlip = () => {
    setSelectedOddsSlip([]);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        predictions,
        addPrediction,
        updatePrediction,
        deletePrediction,
        settleMatch,
        resetPredictionsToDefault,
        subscription,
        activateVIP,
        cancelVIP,
        getRemainingVIPTime,
        isPaymentModalOpen,
        selectedPlanForPayment,
        openPaymentModal,
        closePaymentModal,
        transactions,
        submitPayment,
        approveTransaction,
        rejectTransaction,
        isAdminMode,
        setIsAdminMode,
        isAdminModalOpen,
        setIsAdminModalOpen,
        editingPrediction,
        setEditingPrediction,
        toasts,
        showToast,
        dismissToast,
        selectedOddsSlip,
        toggleSlipItem,
        clearSlip
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
