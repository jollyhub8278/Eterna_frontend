'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Zap, Check, AlertCircle } from 'lucide-react';
import { useQuickBuy } from '@/lib/react-query/queries/tokens';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { RootState } from '@/lib/redux/store';
import { cn } from '@/lib/utils/cn';

interface QuickBuyButtonProps {
  tokenId: string;
  tokenSymbol: string;
}

export const QuickBuyButton: React.FC<QuickBuyButtonProps> = React.memo(({ tokenId, tokenSymbol }) => {
  const quickBuyAmount = useSelector((state: RootState) => state.ui.quickBuyAmount);
  const { mutate, isPending } = useQuickBuy();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    mutate(
      { tokenId, amount: quickBuyAmount },
      {
        onSuccess: () => {
          setStatus('success');
          setTimeout(() => setStatus('idle'), 2000);
        },
        onError: () => {
          setStatus('error');
          setTimeout(() => setStatus('idle'), 2000);
        },
      }
    );
  };
  
  const getIcon = () => {
    if (status === 'success') return <Check className="h-4 w-4" />;
    if (status === 'error') return <AlertCircle className="h-4 w-4" />;
    return <Zap className="h-4 w-4" />;
  };
  
  const getTooltipText = () => {
    if (status === 'success') return 'Purchase successful!';
    if (status === 'error') return 'Purchase failed';
    return `Quick buy ${quickBuyAmount} SOL of ${tokenSymbol}`;
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleQuickBuy}
            disabled={isPending || status !== 'idle'}
            className={cn(
              'p-2 rounded-md transition-all duration-200',
              status === 'idle' && 'bg-primary/10 hover:bg-primary/20 text-primary',
              status === 'success' && 'bg-success/10 text-success',
              status === 'error' && 'bg-danger/10 text-danger',
              isPending && 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Quick buy"
          >
            {isPending ? (
              <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              getIcon()
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

QuickBuyButton.displayName = 'QuickBuyButton';
