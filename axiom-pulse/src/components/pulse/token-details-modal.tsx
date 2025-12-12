'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, ExternalLink, Copy, AlertTriangle } from 'lucide-react';
import { closeTokenModal } from '@/lib/redux/slices/ui-slice';
import { useTokenDetails } from '@/lib/react-query/queries/tokens';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PriceCell } from './price-cell';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import type { RootState } from '@/lib/redux/store';
import { formatMarketCap, formatVolume, formatNumber } from '@/lib/utils/format';

export const TokenDetailsModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.isTokenModalOpen);
  const selectedId = useSelector((state: RootState) => state.tokens.selectedId);
  const priceHistory = useSelector((state: RootState) => 
    selectedId ? state.tokens.priceHistory[selectedId] : undefined
  );
  
  const { data: token, isLoading } = useTokenDetails(selectedId);
  
  const handleClose = () => {
    dispatch(closeTokenModal());
  };
  
  const chartData = React.useMemo(() => {
    if (!priceHistory || priceHistory.length === 0) return [];
    return priceHistory.map((price, index) => ({
      index,
      price,
    }));
  }, [priceHistory]);
  
  const copyAddress = () => {
    if (token) {
      navigator.clipboard.writeText(token.address);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Token Details</DialogTitle>
        </DialogHeader>
        
        {isLoading || !token ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {token.logo && (
                  <img
                    src={token.logo}
                    alt={token.symbol}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold">{token.symbol}</h3>
                    <Badge variant="secondary">{token.category}</Badge>
                    {token.isHoneypot && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Honeypot Risk
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{token.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {token.address.slice(0, 8)}...{token.address.slice(-8)}
                    </code>
                    <button
                      onClick={copyAddress}
                      className="p-1 hover:bg-accent rounded transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <a
                      href={`https://solscan.io/token/${token.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:bg-accent rounded transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
              
              <PriceCell price={token.price} change={token.priceChange24h} />
            </div>
            
            {/* Price Chart */}
            {chartData.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-4">Price History</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="index" 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Market Cap" value={formatMarketCap(token.marketCap)} />
              <StatCard label="24h Volume" value={formatVolume(token.volume24h)} />
              <StatCard label="Liquidity" value={formatVolume(token.liquidity)} />
              <StatCard label="Holders" value={formatNumber(token.holders)} />
              <StatCard label="Transactions" value={formatNumber(token.transactions24h)} />
              <StatCard label="Buys" value={formatNumber(token.buyCount)} />
              <StatCard label="Sells" value={formatNumber(token.sellCount)} />
              <StatCard label="Age" value={`${token.age} mins`} />
            </div>
            
            {/* Holder Analysis */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="text-sm font-semibold">Holder Analysis</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricBar 
                  label="Top 10 Holders" 
                  value={token.top10HoldersPercent} 
                  max={100}
                  warningThreshold={50}
                />
                <MetricBar 
                  label="Dev Holding" 
                  value={token.devHoldingPercent} 
                  max={100}
                  warningThreshold={30}
                />
                <MetricBar 
                  label="Snipers" 
                  value={token.snipersPercent} 
                  max={100}
                  warningThreshold={40}
                />
                <MetricBar 
                  label="Pro Traders" 
                  value={token.proTradersPercent} 
                  max={100}
                  successThreshold={20}
                />
              </div>
            </div>
            
            {/* Risk Score */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <span className="text-sm font-semibold">Risk Score</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      token.riskScore < 30 ? 'bg-success' :
                      token.riskScore < 60 ? 'bg-yellow-500' : 'bg-danger'
                    }`}
                    style={{ width: `${token.riskScore}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{token.riskScore}/100</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-muted/50 rounded-lg p-3">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

interface MetricBarProps {
  label: string;
  value: number;
  max: number;
  warningThreshold?: number;
  successThreshold?: number;
}

const MetricBar: React.FC<MetricBarProps> = ({ 
  label, 
  value, 
  max, 
  warningThreshold, 
  successThreshold 
}) => {
  const percentage = (value / max) * 100;
  const getColor = () => {
    if (successThreshold && value >= successThreshold) return 'bg-success';
    if (warningThreshold && value >= warningThreshold) return 'bg-danger';
    return 'bg-primary';
  };
  
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value.toFixed(1)}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};