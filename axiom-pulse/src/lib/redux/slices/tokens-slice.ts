import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Token, PriceUpdate } from '@/types/token';

interface TokensState {
  items: Record<string, Token>;
  ids: string[];
  selectedId: string | null;
  priceHistory: Record<string, number[]>;
  lastUpdate: number;
}

const initialState: TokensState = {
  items: {},
  ids: [],
  selectedId: null,
  priceHistory: {},
  lastUpdate: Date.now(),
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      const items: Record<string, Token> = {};
      const ids: string[] = [];
      
      action.payload.forEach((token) => {
        items[token.id] = token;
        ids.push(token.id);
      });
      
      state.items = items;
      state.ids = ids;
      state.lastUpdate = Date.now();
    },
    
    updatePrice: (state, action: PayloadAction<PriceUpdate>) => {
      const { tokenId, price, change } = action.payload;
      const token = state.items[tokenId];
      
      if (token) {
        token.price = price;
        token.priceChange24h = change;
        
        // Update price history (keep last 20 prices)
        if (!state.priceHistory[tokenId]) {
          state.priceHistory[tokenId] = [];
        }
        state.priceHistory[tokenId].push(price);
        if (state.priceHistory[tokenId].length > 20) {
          state.priceHistory[tokenId].shift();
        }
      }
      
      state.lastUpdate = Date.now();
    },
    
    updatePriceBatch: (state, action: PayloadAction<PriceUpdate[]>) => {
      action.payload.forEach(({ tokenId, price, change }) => {
        const token = state.items[tokenId];
        if (token) {
          token.price = price;
          token.priceChange24h = change;
          
          if (!state.priceHistory[tokenId]) {
            state.priceHistory[tokenId] = [];
          }
          state.priceHistory[tokenId].push(price);
          if (state.priceHistory[tokenId].length > 20) {
            state.priceHistory[tokenId].shift();
          }
        }
      });
      
      state.lastUpdate = Date.now();
    },
    
    selectToken: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
    
    removeToken: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { 
  setTokens, 
  updatePrice, 
  updatePriceBatch, 
  selectToken, 
  removeToken 
} = tokensSlice.actions;

export default tokensSlice.reducer;