"use client";

import React, { createContext, use, useMemo, useSyncExternalStore } from "react";

type Currency = "USD" | "GBP" | "EUR" | "CAD";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

let currencyStore: Currency | null = null;
const listeners = new Set<() => void>();

const currencyService = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "reiseria_currency") {
        currencyStore = (event.newValue as Currency) || "USD";
        listener();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", handleStorage);
    };
  },
  getSnapshot(): Currency {
    if (currencyStore !== null) {
      return currencyStore;
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reiseria_currency") as Currency;
      if (saved && ["USD", "GBP", "EUR", "CAD"].includes(saved)) {
        currencyStore = saved;
        return saved;
      }
    }
    currencyStore = "USD";
    return "USD";
  },
  getServerSnapshot(): Currency {
    return "USD";
  },
  setCurrency(newCurrency: Currency) {
    currencyStore = newCurrency;
    if (typeof window !== "undefined") {
      localStorage.setItem("reiseria_currency", newCurrency);
    }
    listeners.forEach((listener) => listener());
  }
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency = useSyncExternalStore(
    currencyService.subscribe,
    currencyService.getSnapshot,
    currencyService.getServerSnapshot
  );

  const value = useMemo(() => ({
    currency,
    setCurrency: (newCurrency: Currency) => {
      currencyService.setCurrency(newCurrency);
    }
  }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = use(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
