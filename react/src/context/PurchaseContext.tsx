import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types/Product';

interface PurchaseItem extends Product {
  purchasedAt: string; // 날짜 저장
}

interface PurchaseContextType {
  purchaseHistory: PurchaseItem[];
  addPurchase: (items: Product[]) => void;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export const usePurchase = (): PurchaseContextType => {
  const context = useContext(PurchaseContext);
  if (!context) throw new Error('PurchaseContext is not provided');
  return context;
};

export const PurchaseProvider = ({ children }: { children: ReactNode }) => {
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('purchaseHistory');
    if (stored) setPurchaseHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  const addPurchase = (items: Product[]) => {
    const now = new Date().toISOString();
    const newItems = items.map(item => ({
      ...item,
      purchasedAt: now,
    }));
    setPurchaseHistory(prev => [...prev, ...newItems]);
  };

  return (
    <PurchaseContext.Provider value={{ purchaseHistory, addPurchase }}>
      {children}
    </PurchaseContext.Provider>
  );
};