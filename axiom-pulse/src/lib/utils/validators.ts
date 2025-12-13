import type { FilterState } from '@/types/filter';

export const isValidAddress = (address: string): boolean => {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
};

export const isValidRange = (min: number, max: number): boolean => {
  return min >= 0 && max >= min;
};

export const validateFilterState = (filters: Partial<FilterState>): boolean => {
  if (filters.ageRange && !isValidRange(...filters.ageRange)) return false;
  if (filters.liquidityRange && !isValidRange(...filters.liquidityRange)) return false;
  if (filters.volumeRange && !isValidRange(...filters.volumeRange)) return false;
  if (filters.marketCapRange && !isValidRange(...filters.marketCapRange)) return false;
  return true;
};