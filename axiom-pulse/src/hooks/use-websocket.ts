'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updatePriceBatch } from '@/lib/redux/slices/tokens-slice';
import type { PriceUpdate } from '@/types/token';
import { WEBSOCKET_CONFIG } from '@/lib/utils/constants';

export const useWebSocket = (tokenIds: string[]) => {
  const dispatch = useDispatch();
  const reconnectAttemptsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const generateMockPriceUpdate = useCallback((tokenId: string): PriceUpdate => {
    const change = (Math.random() - 0.5) * 10; // -5% to +5%
    const basePrice = Math.random() * 100;
    const price = basePrice * (1 + change / 100);
    
    return {
      tokenId,
      price,
      change,
      timestamp: Date.now(),
    };
  }, []);
  
  const startPriceUpdates = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (tokenIds.length === 0) return;
      
      // Generate batch updates for all visible tokens
      const updates: PriceUpdate[] = tokenIds.map(generateMockPriceUpdate);
      dispatch(updatePriceBatch(updates));
    }, WEBSOCKET_CONFIG.UPDATE_INTERVAL);
  }, [tokenIds, generateMockPriceUpdate, dispatch]);
  
  const stopPriceUpdates = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  
  useEffect(() => {
    startPriceUpdates();
    
    return () => {
      stopPriceUpdates();
    };
  }, [startPriceUpdates, stopPriceUpdates]);
  
  return {
    isConnected: true,
    reconnectAttempts: reconnectAttemptsRef.current,
  };
};
