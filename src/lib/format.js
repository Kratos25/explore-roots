const SYMBOLS = { INR: '₹', USD: '$', EUR: '€' };

/** 1300 -> ₹1300.00  (matches the rate styling in the design) */
export function formatPrice(value, currency = 'INR', { decimals = 2 } = {}) {
  if (value === null || value === undefined) return '';
  const symbol = SYMBOLS[currency] || '';
  return `${symbol}${Number(value).toFixed(decimals)}`;
}

/** 1690 -> ₹1690  (used for the struck-through compare-at price) */
export function formatCompactPrice(value, currency = 'INR') {
  if (value === null || value === undefined) return '';
  const symbol = SYMBOLS[currency] || '';
  return `${symbol}${Number(value).toLocaleString('en-IN')}`;
}

export function durationLabel(nights, days) {
  return `${nights} Nights / ${days} Days`;
}
