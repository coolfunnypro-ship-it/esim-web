
export interface ESimPlan {
  id: string;
  providerName: string;
  providerLogo: string;
  region: string;
  dataAmount: string; // e.g., "5 GB"
  dataValue: number;  // For sorting (in MB)
  durationDays: number;
  priceUsd: number;
  speed: '4G' | '5G' | 'LTE';
  features: string[];
  isGlobal: boolean;
  buyUrl: string;
}

export interface Region {
  id: string;
  name: string;
  flagEmoji: string;
  popular: boolean;
}

export interface Provider {
  name: string;
  rating: number;
  description: string;
  logo: string;
}
