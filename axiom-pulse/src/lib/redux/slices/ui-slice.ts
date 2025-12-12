import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isFiltersPanelOpen: boolean;
  isTokenModalOpen: boolean;
  quickBuyAmount: number;
  theme: 'light' | 'dark';
  compactView: boolean;
}

const initialState: UiState = {
  isFiltersPanelOpen: false,
  isTokenModalOpen: false,
  quickBuyAmount: 1,
  theme: 'dark',
  compactView: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleFiltersPanel: (state) => {
      state.isFiltersPanelOpen = !state.isFiltersPanelOpen;
    },
    
    openTokenModal: (state) => {
      state.isTokenModalOpen = true;
    },
    
    closeTokenModal: (state) => {
      state.isTokenModalOpen = false;
    },
    
    setQuickBuyAmount: (state, action: PayloadAction<number>) => {
      state.quickBuyAmount = Math.max(0.1, action.payload);
    },
    
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    
    toggleCompactView: (state) => {
      state.compactView = !state.compactView;
    },
  },
});

export const {
  toggleFiltersPanel,
  openTokenModal,
  closeTokenModal,
  setQuickBuyAmount,
  toggleTheme,
  toggleCompactView,
} = uiSlice.actions;

export default uiSlice.reducer;