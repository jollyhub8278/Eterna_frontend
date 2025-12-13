'use client';

import React, { useMemo } from 'react';
import { useFilteredTokens } from '@/hooks/use-tokens';
import { useWebSocket } from '@/hooks/use-websocket';
import { TableHeader } from './table-header';
import { TokenRow } from './token-row';
import { LoadingStates } from './loading-states';
import { EmptyState } from '../shared/empty-state';
import { ErrorBoundary } from '../shared/error-boundary';
import type { Token } from '@/types/token';

export const PulseTable: React.FC = () => {
  const {
    tokens,
    isLoading,
    error,
    refetch,
  }: {
    tokens: Token[];
    isLoading: boolean;
    error: unknown;
    refetch: () => void;
  } = useFilteredTokens();

  const tokenIds = useMemo(
    () => tokens.map((t: Token) => t.id),
    [tokens]
  );

  const { isConnected } = useWebSocket(tokenIds);

  if (error) {
    return (
      <div className="rounded-lg border border-border bg-background p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Failed to load tokens
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingStates />;
  }

  if (tokens.length === 0) {
    return <EmptyState />;
  }

  return (
    <ErrorBoundary>
      <div className="w-full overflow-hidden rounded-lg border border-border bg-background">
        {/* Connection indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-success animate-pulse' : 'bg-danger'
            }`}
          />
          <span className="text-xs text-muted-foreground">
            {isConnected ? 'Live updates' : 'Disconnected'}
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            {tokens.length} token{tokens.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <tbody className="divide-y divide-border">
              {tokens.map((token, index) => (
                <TokenRow
                  key={token.id}
                  token={token}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ErrorBoundary>
  );
};

