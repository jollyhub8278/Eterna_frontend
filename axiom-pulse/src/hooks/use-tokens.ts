'use client';

import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import type { RootState } from '@/lib/redux/store';
import type { Token } from '@/types/token';
import { useTokens as useTokensQuery } from '@/lib/react-query/queries/tokens';

export const useFilteredTokens = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const { data, isLoading, error, refetch } = useTokensQuery(filters);
  
  const tokens = useMemo(() => {
    if (!data) return [];
    
    let filtered = data.tokens;
    
    // Apply search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (token) =>
          token.name.toLowerCase().includes(search) ||
          token.symbol.toLowerCase().includes(search) ||
          token.address.toLowerCase().includes(search)
      );
    }
    
    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter((token) => token.category === filters.category);
    }
    
    // Apply platform filter
    if (filters.platform.length > 0) {
      filtered = filtered.filter((token) => filters.platform.includes(token.platform));
    }
    
    // Apply chain filter
    if (filters.chain.length > 0) {
      filtered = filtered.filter((token) => filters.chain.includes(token.chain));
    }
    
    // Apply range filters
    filtered = filtered.filter((token) => {
      return (
        token.age >= filters.ageRange[0] &&
        token.age <= filters.ageRange[1] &&
        token.liquidity >= filters.liquidityRange[0] &&
        token.liquidity <= filters.liquidityRange[1] &&
        token.volume24h >= filters.volumeRange[0] &&
        token.volume24h <= filters.volumeRange[1] &&
        token.marketCap >= filters.marketCapRange[0] &&
        token.marketCap <= filters.marketCapRange[1] &&
        token.holders >= filters.holdersRange[0] &&
        token.holders <= filters.holdersRange[1] &&
        token.top10HoldersPercent <= filters.maxTop10Holders &&
        token.devHoldingPercent <= filters.maxDevHolding &&
        token.snipersPercent <= filters.maxSnipers &&
        token.proTradersPercent >= filters.minProTraders
      );
    });
    
    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy];
      const bValue = b[filters.sortBy];
      
      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filtered;
  }, [data, filters]);
  
  return {
    tokens,
    isLoading,
    error,
    refetch,
    total: data?.total ?? 0,
    hasMore: data?.hasMore ?? false,
  };
};