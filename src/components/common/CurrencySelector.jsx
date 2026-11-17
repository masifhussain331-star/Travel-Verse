import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { ChevronDown, RefreshCw, Info } from 'lucide-react';

export default function CurrencySelector({ compact = false }) {
  const { currentCurrency, setCurrentCurrency, currencies, currencyData } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 bg-slate-100/80 hover:bg-slate-200/80 transition-all border border-slate-200/70"
        title="Change Display Currency (Default: PKR)"
      >
        <span className="text-base">{currencyData.flag}</span>
        <span className="font-semibold">{currencyData.code}</span>
        <span className="text-slate-400 text-xs">({currencyData.symbol})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Display Currency</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-1.5 py-0.5 rounded">Default: PKR</span>
          </div>

          <div className="max-h-60 overflow-y-auto py-1">
            {Object.values(currencies).map((curr) => {
              const isSelected = curr.code === currentCurrency;
              return (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrentCurrency(curr.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-blue-50/70 transition-colors ${
                    isSelected ? 'bg-blue-50 font-bold text-blue-700' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{curr.flag}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-slate-800">{curr.code}</span>
                        <span className="text-slate-400 text-xs font-normal">({curr.symbol})</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{curr.name}</div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-3 pt-2 mt-1 border-t border-slate-100 text-[10px] text-slate-500 flex items-center gap-1.5">
            <Info className="w-3 h-3 text-blue-500 shrink-0" />
            <span>Exchange rates updated live. Supplier currencies preserved.</span>
          </div>
        </div>
      )}
    </div>
  );
}

