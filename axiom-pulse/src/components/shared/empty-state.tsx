import React from 'react';
import { Search } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No tokens found</h3>
      <p className="text-sm text-muted-foreground max-w-md">
        No tokens match your current filters. Try adjusting your search criteria or reset the filters.
      </p>
    </div>
  );
};