'use client';

import React from 'react';
import { useFilters } from '@/hooks/use-filters';
import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PLATFORMS, CHAINS, CATEGORIES } from '@/lib/utils/constants';

export const FiltersPanel: React.FC = () => {
  const { filters, updateCategory, updatePlatform, updateChain, reset } = useFilters();
  
  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    filters.platform.length +
    (filters.chain.length !== 1 || filters.chain[0] !== 'sol' ? 1 : 0);
  
  return (
    <div className="bg-background border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="h-8 px-2 text-xs"
          >
            Reset
          </Button>
        )}
      </div>
      
      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category.value}
              variant={filters.category === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateCategory(category.value)}
              className="text-xs"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Platform */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Platform</label>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((platform) => (
            <Button
              key={platform.value}
              variant={filters.platform.includes(platform.value) ? 'default' : 'outline'}
              size="sm"
              onClick={() => updatePlatform(platform.value)}
              className="text-xs flex items-center gap-2"
            >
              {platform.label}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Chain */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Chain</label>
        <div className="flex flex-wrap gap-2">
          {CHAINS.map((chain) => (
            <Button
              key={chain.value}
              variant={filters.chain.includes(chain.value) ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateChain(chain.value)}
              className="text-xs flex items-center gap-2"
            >
              {chain.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
