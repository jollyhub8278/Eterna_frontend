import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from './slices/tokens-slice';
import filtersReducer from './slices/filters-slice';
import uiReducer from './slices/ui-slice';

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['tokens/updatePrice'],
        ignoredPaths: ['tokens.lastUpdate'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;