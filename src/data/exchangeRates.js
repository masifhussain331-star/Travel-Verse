// Exchange Rate Service & Currency Definitions
// Default display currency for TRAVELVERSE is PKR (₨)

export const CURRENCIES = {
  PKR: {
    code: 'PKR',
    symbol: '₨',
    name: 'Pakistani Rupee',
    rateToUSD: 278.60, // 1 USD = 278.60 PKR
    flag: '🇵🇰',
    format: (val) => `₨ ${Number(val).toLocaleString('en-PK', { maximumFractionDigits: 0 })}`
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rateToUSD: 1.0,
    flag: '🇺🇸',
    format: (val) => `$${Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rateToUSD: 0.92, // 1 USD = 0.92 EUR
    flag: '🇪🇺',
    format: (val) => `€${Number(val).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rateToUSD: 0.79, // 1 USD = 0.79 GBP
    flag: '🇬🇧',
    format: (val) => `£${Number(val).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    rateToUSD: 3.67, // 1 USD = 3.67 AED
    flag: '🇦🇪',
    format: (val) => `AED ${Number(val).toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR',
    name: 'Saudi Riyal',
    rateToUSD: 3.75, // 1 USD = 3.75 SAR
    flag: '🇸🇦',
    format: (val) => `SAR ${Number(val).toLocaleString('en-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
};

export const EXCHANGE_RATE_TIMESTAMP = "2026-11-17T11:00:00Z";
export const EXCHANGE_SOURCE = "Open Financial Rates Hub & Central Banking Indices";

/**
 * Convert any amount from one currency to another
 */
export function convertPrice(amount, fromCode = 'USD', toCode = 'PKR') {
  if (isNaN(amount) || amount === null) return 0;
  const numAmount = parseFloat(amount);
  if (fromCode === toCode) return numAmount;

  const fromCurr = CURRENCIES[fromCode] || CURRENCIES.USD;
  const toCurr = CURRENCIES[toCode] || CURRENCIES.PKR;

  // Convert to USD first (base)
  const amountInUSD = numAmount / fromCurr.rateToUSD;
  // Convert from USD to target currency
  const converted = amountInUSD * toCurr.rateToUSD;

  return Math.round(converted * 100) / 100;
}

/**
 * Format a price nicely with symbol and locale
 */
export function formatPrice(amount, currencyCode = 'PKR') {
  const curr = CURRENCIES[currencyCode] || CURRENCIES.PKR;
  return curr.format(amount);
}

