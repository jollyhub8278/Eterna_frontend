import { NextRequest, NextResponse } from 'next/server';
import type { Token, ApiResponse, TokensResponse } from '@/types/token';

// Mock data generator
const generateMockToken = (id: number, category: Token['category']): Token => {
  const symbols = ['PEPE', 'DOGE', 'SHIB', 'BONK', 'WIF', 'MEME', 'FLOKI', 'SAMO'];
  const platforms: Token['platform'][] = ['pump', 'raydium', 'launchlab', 'virtual'];
  const chains: Token['chain'][] = ['sol', 'eth', 'btc'];
  
  const basePrice = Math.random() * 100;
  const marketCap = Math.random() * 10000000;
  
  return {
    id: `token-${id}`,
    address: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    name: `${symbols[Math.floor(Math.random() * symbols.length)]} Token ${id}`,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${id}`,
    price: basePrice,
    priceChange24h: (Math.random() - 0.5) * 20,
    marketCap,
    volume24h: marketCap * (0.1 + Math.random() * 0.4),
    liquidity: marketCap * (0.05 + Math.random() * 0.2),
    holders: Math.floor(Math.random() * 10000) + 100,
    transactions24h: Math.floor(Math.random() * 5000) + 50,
    buyCount: Math.floor(Math.random() * 3000) + 30,
    sellCount: Math.floor(Math.random() * 2000) + 20,
    age: Math.floor(Math.random() * 1440), // 0-1440 minutes (1 day)
    top10HoldersPercent: Math.random() * 50,
    devHoldingPercent: Math.random() * 30,
    snipersPercent: Math.random() * 40,
    insidersPercent: Math.random() * 20,
    bundlePercent: Math.random() * 15,
    proTradersPercent: Math.random() * 60,
    category,
    chain: chains[Math.floor(Math.random() * chains.length)],
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    isHoneypot: Math.random() > 0.9,
    riskScore: Math.floor(Math.random() * 100),
  };
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const category = searchParams.get('category') || 'all';
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Generate mock tokens
    const categories: Token['category'][] = 
      category === 'all' 
        ? ['new', 'final', 'migrated'] 
        : [category as Token['category']];
    
    const tokens: Token[] = [];
    const tokensPerCategory = Math.ceil(limit / categories.length);
    
    categories.forEach((cat, catIndex) => {
      for (let i = 0; i < tokensPerCategory; i++) {
        const id = (page - 1) * limit + catIndex * tokensPerCategory + i;
        tokens.push(generateMockToken(id, cat));
      }
    });
    
    const response: ApiResponse<TokensResponse> = {
      success: true,
      data: {
        tokens: tokens.slice(0, limit),
        total: 1000,
        hasMore: page * limit < 1000,
      },
      timestamp: Date.now(),
    };
    
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<TokensResponse> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: { tokens: [], total: 0, hasMore: false },
      timestamp: Date.now(),
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}