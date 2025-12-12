'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatPrice, formatPercent } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface PriceCellProps {
  price: number;
  change: number;
}

export const PriceCell: React.FC<PriceCellProps> = React.memo(({ price, change }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-foreground">
        {formatPrice(price)}
      </span>
      <div
        className={cn(
          'flex items-center gap-1 text-xs font-medium',
          isPositive ? 'text-success' : 'text-danger'
        )}
      >
        {isPositive ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        <span>{formatPercent(Math.abs(change))}</span>
      </div>
    </div>
  );
});

PriceCell.displayName = 'PriceCell';