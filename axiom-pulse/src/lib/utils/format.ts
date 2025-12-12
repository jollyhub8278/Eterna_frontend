export const formatPrice = (price: number): string => {
  if (price >= 1) {
    return `$${price.toFixed(2)}`;
  }
  if (price >= 0.01) {
    return `$${price.toFixed(4)}`;
  }
  return `$${price.toFixed(8)}`;
};

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1_000_000_000) {
    return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
  }
  if (marketCap >= 1_000_000) {
    return `$${(marketCap / 1_000_000).toFixed(2)}M`;
  }
  if (marketCap >= 1_000) {
    return `$${(marketCap / 1_000).toFixed(2)}K`;
  }
  return `$${marketCap.toFixed(2)}`;
};

export const formatVolume = formatMarketCap;

export const formatPercent = (percent: number, decimals: number = 2): string => {
  const sign = percent > 0 ? '+' : '';
  return `${sign}${percent.toFixed(decimals)}%`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatAge = (ageInMinutes: number): string => {
  if (ageInMinutes < 1) {
    return 'Just now';
  }
  if (ageInMinutes < 60) {
    return `${Math.floor(ageInMinutes)}m`;
  }
  if (ageInMinutes < 1440) {
    return `${Math.floor(ageInMinutes / 60)}h`;
  }
  return `${Math.floor(ageInMinutes / 1440)}d`;
};