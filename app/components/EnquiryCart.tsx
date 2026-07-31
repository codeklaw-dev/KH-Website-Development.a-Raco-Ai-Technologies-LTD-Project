"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { OrderField } from "../products/productData";

export type EnquiryItem = {
  slug: string;
  title: string;
  n: string;
  fields: OrderField[];
  values: string[];
};

type EnquiryContextValue = {
  items: EnquiryItem[];
  isInCart: (slug: string) => boolean;
  addItem: (item: Omit<EnquiryItem, "values">) => void;
  removeItem: (slug: string) => void;
  updateValue: (slug: string, index: number, value: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);
const STORAGE_KEY = "kh-enquiry-cart";

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const isInCart = useCallback((slug: string) => items.some((item) => item.slug === slug), [items]);

  const addItem: EnquiryContextValue["addItem"] = useCallback((item) => {
    setItems((current) => {
      if (current.some((existing) => existing.slug === item.slug)) return current;
      return [...current, { ...item, values: item.fields.map(() => "") }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const updateValue = useCallback((slug: string, index: number, value: string) => {
    setItems((current) => current.map((item) => {
      if (item.slug !== slug) return item;
      const values = [...item.values];
      values[index] = value;
      return { ...item, values };
    }));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo(
    () => ({ items, isInCart, addItem, removeItem, updateValue, clear, drawerOpen, openDrawer, closeDrawer }),
    [items, isInCart, addItem, removeItem, updateValue, clear, drawerOpen, openDrawer, closeDrawer],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiryCart() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiryCart must be used within EnquiryProvider");
  return ctx;
}
