'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Settings } from 'lucide-react';
import { toggleFiltersPanel, setQuickBuyAmount } from '@/lib/redux/slices/ui-slice';
import { SearchBar } from './search-bar';
import type { RootState } from '@/lib/redux/store';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const quickBuyAmount = useSelector((state: RootState) => state.ui.quickBuyAmount);
  const isFiltersPanelOpen = useSelector((state: RootState) => state.ui.isFiltersPanelOpen);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <img src="/axiom.svg" alt="Axiom" className="h-8 w-8" />
          <span className="font-bold text-xl">Axiom Pulse</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center max-w-2xl mx-auto">
          <SearchBar />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Quick Buy:</span>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={quickBuyAmount}
              onChange={(e) => dispatch(setQuickBuyAmount(parseFloat(e.target.value)))}
              className="w-20 px-2 py-1 text-sm border border-border rounded-md bg-background"
            />
            <span className="text-sm text-muted-foreground">SOL</span>
          </div>
          
          <button
            onClick={() => dispatch(toggleFiltersPanel())}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Toggle filters"
          >
            <Menu className={`h-5 w-5 ${isFiltersPanelOpen ? 'text-primary' : 'text-muted-foreground'}`} />
          </button>
        </div>
      </div>
    </header>
  );
};