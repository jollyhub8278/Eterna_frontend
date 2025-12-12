// src/types/filter.ts
export interface FilterState {
  search: string;
  category: 'all' | 'new' | 'final' | 'migrated';
  platform: string[];
  chain: string[];
  ageRange: [number, number];
  liquidityRange: [number, number];
  volumeRange: [number, number];
  marketCapRange: [number, number];
  holdersRange: [number, number];
  maxTop10Holders: number;
  maxDevHolding: number;
  maxSnipers: number;
  minProTraders: number;
  sortBy: SortField;
  sortOrder: 'asc' | 'desc';
}

export type SortField = 
  | 'age' 
  | 'price' 
  | 'marketCap' 
  | 'volume24h' 
  | 'liquidity' 
  | 'holders'
  | 'transactions24h';