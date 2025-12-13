import { NextRequest, NextResponse } from 'next/server';
import type { Token } from '@/types/token';
import type { ApiResponse } from '@/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    // In a real app, fetch token details from database
    const mockToken: Token = {
      id: params.id,
      address: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      name: 'Sample Token',
      symbol: 'SMPL',
      logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${params.id}`,
      price: Math.random() * 100,
      priceChange24h: (Math.random() - 0.5) * 20,
      marketCap: Math.random() * 10000000,
      volume24h: Math.random() * 5000000,
      liquidity: Math.random() * 2000000,
      holders: Math.floor(Math.random() * 10000),
      transactions24h: Math.floor(Math.random() * 5000),
      buyCount: Math.floor(Math.random() * 3000),
      sellCount: Math.floor(Math.random() * 2000),
      age: Math.floor(Math.random() * 1440),
      top10HoldersPercent: Math.random() * 50,
      devHoldingPercent: Math.random() * 30,
      snipersPercent: Math.random() * 40,
      insidersPercent: Math.random() * 20,
      bundlePercent: Math.random() * 15,
      proTradersPercent: Math.random() * 60,
      category: 'new',
      chain: 'sol',
      platform: 'pump',
      createdAt: new Date().toISOString(),
      isHoneypot: false,
      riskScore: Math.floor(Math.random() * 100),
    };
    
    const response: ApiResponse<Token> = {
      success: true,
      data: mockToken,
      timestamp: Date.now(),
    };
    
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<Token> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: {} as Token,
      timestamp: Date.now(),
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}