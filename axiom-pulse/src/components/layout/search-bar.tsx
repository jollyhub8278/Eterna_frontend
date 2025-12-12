'use client';

import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useFilters } from '@/hooks/use-filters';
import { useDebounce } from '@/hooks/use-debounce';

export const SearchBar: React.FC = () => {
  const { filters, updateSearch } = useFilters();
  const [localSearch, setLocalSearch] = useState(filters.search);
  const debouncedSearch = useDebounce(localSearch, 300);
  
  React.useEffect(() => {
    updateSearch(debouncedSearch);
  }, [debouncedSearch, updateSearch]);
  
  const handleClear = useCallback(() => {
    setLocalSearch('');
    updateSearch('');
  }, [updateSearch]);
  
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search by token, symbol, or address..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      {localSearch && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
};