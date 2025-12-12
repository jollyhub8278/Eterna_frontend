'use client';

import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useFilters } from '@/hooks/use-filters';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { SortField } from '@/types/filter';

const COLUMNS: Array<{ key: SortField; label: string; tooltip?: string; sortable: boolean }> = [
  { key: 'age', label: 'Token', tooltip: 'Token name and age', sortable: true },
  { key: 'price', label: 'Price', tooltip: 'Current price', sortable: true },
  { key: 'marketCap', label: 'Market Cap', tooltip: 'Market capitalization', sortable: true },
  { key: 'volume24h', label: '24h Volume', tooltip: '24-hour trading volume', sortable: true },
  { key: 'liquidity', label: 'Liquidity', tooltip: 'Available liquidity', sortable: true },
  { key: 'holders', label: 'Holders', tooltip: 'Number of unique holders', sortable: true },
  { key: 'transactions24h', label: 'Txns', tooltip: '24-hour transactions', sortable: true },
];

export const TableHeader: React.FC = React.memo(() => {
  const { filters, updateSort } = useFilters();
  
  const getSortIcon = (field: SortField) => {
    if (filters.sortBy !== field) {
      return <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />;
    }
    return filters.sortOrder === 'asc' ? (
      <ArrowUp className="ml-1 h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 h-3 w-3" />
    );
  };
  
  return (
    <thead className="bg-muted/50 sticky top-0 z-10">
      <tr className="border-b border-border">
        <th className="px-4 py-3 text-left">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Action
          </span>
        </th>
        
        {COLUMNS.map((column) => (
          <th key={column.key} className="px-4 py-3 text-left">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => column.sortable && updateSort(column.key)}
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                    disabled={!column.sortable}
                  >
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                  </button>
                </TooltipTrigger>
                {column.tooltip && (
                  <TooltipContent>
                    <p>{column.tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </th>
        ))}
        
        <th className="px-4 py-3 text-left">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Info
          </span>
        </th>
      </tr>
    </thead>
  );
});
TableHeader.displayName = 'TableHeader';
