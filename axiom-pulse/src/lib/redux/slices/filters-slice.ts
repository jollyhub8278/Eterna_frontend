import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FilterState, SortField } from '@/types/filter';

const initialState: FilterState = {
  search: '',
  category: 'all',
  platform: [],
  chain: ['sol'],
  ageRange: [0, 1440],
  liquidityRange: [0, 10000000],
  volumeRange: [0, 10000000],
  marketCapRange: [0, 100000000],
  holdersRange: [0, 100000],
  maxTop10Holders: 100,
  maxDevHolding: 100,
  maxSnipers: 100,
  minProTraders: 0,
  sortBy: 'age',
  sortOrder: 'asc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    
    setCategory: (state, action: PayloadAction<FilterState['category']>) => {
      state.category = action.payload;
    },
    
    togglePlatform: (state, action: PayloadAction<string>) => {
      const index = state.platform.indexOf(action.payload);
      if (index > -1) {
        state.platform.splice(index, 1);
      } else {
        state.platform.push(action.payload);
      }
    },
    
    toggleChain: (state, action: PayloadAction<string>) => {
      const index = state.chain.indexOf(action.payload);
      if (index > -1) {
        state.chain.splice(index, 1);
      } else {
        state.chain.push(action.payload);
      }
    },
    
    setAgeRange: (state, action: PayloadAction<[number, number]>) => {
      state.ageRange = action.payload;
    },
    
    setLiquidityRange: (state, action: PayloadAction<[number, number]>) => {
      state.liquidityRange = action.payload;
    },
    
    setVolumeRange: (state, action: PayloadAction<[number, number]>) => {
      state.volumeRange = action.payload;
    },
    
    setMarketCapRange: (state, action: PayloadAction<[number, number]>) => {
      state.marketCapRange = action.payload;
    },
    
    setSort: (state, action: PayloadAction<{ field: SortField; order?: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.field;
      if (action.payload.order) {
        state.sortOrder = action.payload.order;
      } else {
        // Toggle order if same field
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      }
    },
    
    resetFilters: () => initialState,
  },
});

export const {
  setSearch,
  setCategory,
  togglePlatform,
  toggleChain,
  setAgeRange,
  setLiquidityRange,
  setVolumeRange,
  setMarketCapRange,
  setSort,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
