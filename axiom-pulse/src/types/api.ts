import type { Token } from './token';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  timestamp: number;
}

export interface TokensResponse {
  tokens: Token[];
  total: number;
  hasMore: boolean;
}
