export const CATEGORIES = [
  { value: 'all', label: 'All Pairs' },
  { value: 'new', label: 'New Pairs' },
  { value: 'final', label: 'Final Stretch' },
  { value: 'migrated', label: 'Migrated' },
] as const;

export const PLATFORMS = [
  { value: 'pump', label: 'Pump.fun', icon: '/images/pump.svg' },
  { value: 'raydium', label: 'Raydium', icon: '/images/raydium.svg' },
  { value: 'launchlab', label: 'LaunchLab', icon: '/images/launchlab.svg' },
  { value: 'virtual', label: 'Virtual Curve', icon: '/images/virtual-curve.svg' },
] as const;

export const CHAINS = [
  { value: 'sol', label: 'Solana', icon: '/images/sol-fill.svg' },
  { value: 'eth', label: 'Ethereum', icon: '/images/eth-fill.svg' },
  { value: 'btc', label: 'Bitcoin', icon: '/images/btc-fill.svg' },
] as const;

export const WEBSOCKET_CONFIG = {
  RECONNECT_DELAY: 3000,
  MAX_RECONNECT_ATTEMPTS: 5,
  HEARTBEAT_INTERVAL: 30000,
  UPDATE_INTERVAL: 2000,
} as const;

export const QUERY_KEYS = {
  TOKENS: 'tokens',
  TOKEN_DETAILS: 'token-details',
} as const;