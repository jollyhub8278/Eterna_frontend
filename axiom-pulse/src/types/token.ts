export interface Token {
  id: string;
  address: string;
  name: string;
  symbol: string;
  logo?: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  holders: number;
  transactions24h: number;
  buyCount: number;
  sellCount: number;
  age: number; // in minutes
  top10HoldersPercent: number;
  devHoldingPercent: number;
  snipersPercent: number;
  insidersPercent: number;
  bundlePercent: number;
  proTradersPercent: number;
  category: 'new' | 'final' | 'migrated';
  chain: 'sol' | 'eth' | 'btc';
  platform: 'pump' | 'raydium' | 'launchlab' | 'virtual';
  createdAt: string;
  isHoneypot: boolean;
  riskScore: number;
}

export interface PriceUpdate {
  tokenId: string;
  price: number;
  change: number;
  timestamp: number;
}

