'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { selectToken } from '@/lib/redux/slices/tokens-slice';
import {  openTokenModal } from '@/lib/redux/slices/ui-slice';
import { QuickBuyButton } from './quick-buy-button';
import { PriceCell } from './price-cell';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Token } from '@/types/token';
import { formatMarketCap, formatVolume, formatNumber, formatAge } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface TokenRowProps {
  token: Token;
  index: number;
}

export const TokenRow: React.FC<TokenRowProps> = React.memo(({ token, index }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const prevPriceRef = useRef(token.price);
  const [priceAnimation, setPriceAnimation] = useState<'up' | 'down' | null>(null);
  
  useEffect(() => {
    if (prevPriceRef.current !== token.price) {
      setPriceAnimation(token.price > prevPriceRef.current ? 'up' : 'down');
      prevPriceRef.current = token.price;
      
      const timeout = setTimeout(() => setPriceAnimation(null), 600);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [token.price]);
  
  const handleShowDetails = () => {
    dispatch(selectToken(token.id));
    dispatch(openTokenModal());
  };
  
  const getCategoryBadge = () => {
    const variants: Record<typeof token.category, { variant: 'default' | 'secondary' | 'success'; label: string }> = {
      new: { variant: 'success', label: 'New' },
      final: { variant: 'secondary', label: 'Final' },
      migrated: { variant: 'default', label: 'Migrated' },
    };
    
    const { variant, label } = variants[token.category];
    return <Badge variant={variant} className="text-xs">{label}</Badge>;
  };
  
  return (
    <tr
      className={cn(
        'group transition-all duration-200 hover:bg-accent/50',
        priceAnimation === 'up' && 'animate-priceUp',
        priceAnimation === 'down' && 'animate-priceDown',
        'animate-fadeIn'
      )}
      style={{ animationDelay: `${index * 30}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quick Buy */}
      <td className="px-4 py-3">
        <QuickBuyButton tokenId={token.id} tokenSymbol={token.symbol} />
      </td>
      
      {/* Token Info */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {token.logo && (
            <img
              src={token.logo}
              alt={token.symbol}
              className="w-8 h-8 rounded-full"
              loading="lazy"
            />
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{token.symbol}</span>
              {getCategoryBadge()}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{token.name}</span>
              <span>·</span>
              <span>{formatAge(token.age)}</span>
            </div>
          </div>
        </div>
      </td>
      
      {/* Price */}
      <td className="px-4 py-3">
        <PriceCell price={token.price} change={token.priceChange24h} />
      </td>
      
      {/* Market Cap */}
      <td className="px-4 py-3">
        <span className="text-sm text-foreground font-medium">
          {formatMarketCap(token.marketCap)}
        </span>
      </td>
      
      {/* Volume */}
      <td className="px-4 py-3">
        <span className="text-sm text-foreground">
          {formatVolume(token.volume24h)}
        </span>
      </td>
      
      {/* Liquidity */}
      <td className="px-4 py-3">
        <span className="text-sm text-foreground">
          {formatVolume(token.liquidity)}
        </span>
      </td>
      
      {/* Holders */}
      <td className="px-4 py-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-sm text-foreground">
                {formatNumber(token.holders)}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>Top 10: {token.top10HoldersPercent.toFixed(1)}%</p>
                <p>Dev: {token.devHoldingPercent.toFixed(1)}%</p>
                <p>Pro Traders: {token.proTradersPercent.toFixed(1)}%</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </td>
      
      {/* Transactions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">
            {formatNumber(token.transactions24h)}
          </span>
          <div className="flex flex-col text-xs">
            <span className="text-success flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {token.buyCount}
            </span>
            <span className="text-danger flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              {token.sellCount}
            </span>
          </div>
        </div>
      </td>
      
      {/* Info Button */}
      <td className="px-4 py-3">
        <button
          onClick={handleShowDetails}
          className="p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="View token details"
        >
          <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </button>
      </td>
    </tr>
  );
});

TokenRow.displayName = 'TokenRow';