import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENCIES, convertPrice, formatPrice, EXCHANGE_RATE_TIMESTAMP } from '../data/exchangeRates';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currentCurrency, setCurrentCurrency] = useState(() => {
    return localStorage.getItem('travelverse_currency') || 'PKR';
  });

  useEffect(() => {
    localStorage.setItem('travelverse_currency', currentCurrency);
  }, [currentCurrency]);

  const currencyData = CURRENCIES[currentCurrency] || CURRENCIES.PKR;

  const convert = (amountUSD) => {
    return convertPrice(amountUSD, 'USD', currentCurrency);
  };

  const format = (amountUSD) => {
    const converted = convert(amountUSD);
    return formatPrice(converted, currentCurrency);
  };

  const formatFromPKR = (amountPKR) => {
    const converted = convertPrice(amountPKR, 'PKR', currentCurrency);
    return formatPrice(converted, currentCurrency);
  };

  return (
    <CurrencyContext.Provider value={{
      currentCurrency,
      setCurrentCurrency,
      currencyData,
      currencies: CURRENCIES,
      convert,
      format,
      formatFromPKR,
      exchangeTimestamp: EXCHANGE_RATE_TIMESTAMP
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

