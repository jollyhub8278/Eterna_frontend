import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Token, ApiResponse, TokensResponse } from '@/types/token';
import type { FilterState } from '@/types/filter';
import { QUERY_KEYS } from '@/lib/utils/constants';

interface FetchTokensParams {
  filters: FilterState;
  page?: number;
  limit?: number;
}

const fetchTokens = async ({ filters, page = 1, limit = 50 }: FetchTokensParams): Promise<TokensResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...Object.entries(filters).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.join(',');
      } else if (value !== undefined && value !== null) {
        acc[key] = value.toString();
      }
      return acc;
    }, {} as Record<string, string>),
  });

  const response = await fetch(`/api/tokens?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch tokens');
  }
  
  const data: ApiResponse<TokensResponse> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Unknown error');
  }
  
  return data.data;
};

export const useTokens = (filters: FilterState, page: number = 1) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TOKENS, filters, page],
    queryFn: () => fetchTokens({ filters, page }),
    staleTime: 3000,
  });
};

const fetchTokenDetails = async (tokenId: string): Promise<Token> => {
  const response = await fetch(`/api/tokens/${tokenId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch token details');
  }
  
  const data: ApiResponse<Token> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Unknown error');
  }
  
  return data.data;
};

export const useTokenDetails = (tokenId: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TOKEN_DETAILS, tokenId],
    queryFn: () => fetchTokenDetails(tokenId!),
    enabled: !!tokenId,
    staleTime: 5000,
  });
};

// Mock quick buy mutation
export const useQuickBuy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ tokenId, amount }: { tokenId: string; amount: number }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return {
        success: true,
        transactionHash: `0x${Math.random().toString(36).substring(2, 15)}`,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TOKENS] });
    },
  });
};
