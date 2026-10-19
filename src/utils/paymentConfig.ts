/**
 * Payment configuration for CAPOLOT TIPS.
 * Official Payment Hotline: 256704341893 (+256 704 341 893)
 * Kept hidden behind the "Copy Payment Number" button.
 */

export const HARDCODED_PAYMENT_NUMBER = '256704341893';
export const HARDCODED_PAYMENT_FORMATTED = '+256 704 341 893';

export const getPaymentHotline = (): string => {
  return HARDCODED_PAYMENT_NUMBER;
};

export const formatHotlineNumber = (num: string = HARDCODED_PAYMENT_NUMBER): string => {
  if (num === HARDCODED_PAYMENT_NUMBER) return HARDCODED_PAYMENT_FORMATTED;
  if (num.startsWith('256') && num.length === 12) {
    return `+256 ${num.slice(3, 6)} ${num.slice(6, 9)} ${num.slice(9)}`;
  }
  return num;
};
