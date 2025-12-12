'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const LoadingStates: React.FC = () => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-background">
      <div className="p-4 border-b border-border">
        <Skeleton className="h-4 w-32" />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr className="border-b border-border">
              {Array.from({ length: 9 }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 9 }).map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <Skeleton className="h-8 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};