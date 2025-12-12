'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import type { RootState } from '@/lib/redux/store';
import {
  setSearch,
  setCategory,
  togglePlatform,
  toggleChain,
  setSort,
  resetFilters,
} from '@/lib/redux/slices/filters-slice';
import type { SortField } from '@/types/filter';

export const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  
  const updateSearch = useCallback((search: string) => {
    dispatch(setSearch(search));
  }, [dispatch]);
  
  const updateCategory = useCallback((category: typeof filters.category) => {
    dispatch(setCategory(category));
  }, [dispatch]);
  
  const updatePlatform = useCallback((platform: string) => {
    dispatch(togglePlatform(platform));
  }, [dispatch]);
  
  const updateChain = useCallback((chain: string) => {
    dispatch(toggleChain(chain));
  }, [dispatch]);
  
  const updateSort = useCallback((field: SortField, order?: 'asc' | 'desc') => {
    dispatch(setSort({ field, order }));
  }, [dispatch]);
  
  const reset = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);
  
  return {
    filters,
    updateSearch,
    updateCategory,
    updatePlatform,
    updateChain,
    updateSort,
    reset,
  };
};