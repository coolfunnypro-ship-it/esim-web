
import { ESimPlan, Region, Provider } from './types';

export const REGIONS: Region[] = [
  { id: 'usa', name: 'United States', flagEmoji: '🇺🇸', popular: true },
  { id: 'japan', name: 'Japan', flagEmoji: '🇯🇵', popular: true },
  { id: 'uk', name: 'United Kingdom', flagEmoji: '🇬🇧', popular: true },
  { id: 'thailand', name: 'Thailand', flagEmoji: '🇹🇭', popular: true },
  { id: 'france', name: 'France', flagEmoji: '🇫🇷', popular: true },
  { id: 'germany', name: 'Germany', flagEmoji: '🇩🇪', popular: true },
  { id: 'europe', name: 'Europe (Regional)', flagEmoji: '🇪🇺', popular: true },
  { id: 'global', name: 'Global', flagEmoji: '🌎', popular: true },
  { id: 'china', name: 'China', flagEmoji: '🇨🇳', popular: false },
  { id: 'korea', name: 'South Korea', flagEmoji: '🇰🇷', popular: false },
];

export const PROVIDERS: Provider[] = [
  { name: 'Airalo', rating: 4.5, description: 'The world\'s first eSIM store.', logo: 'https://picsum.photos/id/1/64/64' },
  { name: 'Holafly', rating: 4.8, description: 'Unlimited data plans for travelers.', logo: 'https://picsum.photos/id/2/64/64' },
  { name: 'Nomad', rating: 4.2, description: 'Flexible and affordable connectivity.', logo: 'https://picsum.photos/id/3/64/64' },
  { name: 'Yesim', rating: 4.0, description: 'Stay connected anywhere in the world.', logo: 'https://picsum.photos/id/4/64/64' },
];

export const PLANS: ESimPlan[] = [
  // USA
  { id: '1', providerName: 'Airalo', providerLogo: 'https://picsum.photos/id/10/40/40', region: 'usa', dataAmount: '1 GB', dataValue: 1024, durationDays: 7, priceUsd: 4.50, speed: '5G', features: ['Instant Activation', 'Hotspot Support'], isGlobal: false, buyUrl: '#' },
  { id: '2', providerName: 'Nomad', providerLogo: 'https://picsum.photos/id/11/40/40', region: 'usa', dataAmount: '5 GB', dataValue: 5120, durationDays: 30, priceUsd: 14.00, speed: 'LTE', features: ['T-Mobile Network', 'Rechargeable'], isGlobal: false, buyUrl: '#' },
  { id: '3', providerName: 'Holafly', providerLogo: 'https://picsum.photos/id/12/40/40', region: 'usa', dataAmount: 'Unlimited', dataValue: 999999, durationDays: 15, priceUsd: 47.00, speed: '5G', features: ['Unlimited Data', 'No Hotspot'], isGlobal: false, buyUrl: '#' },
  
  // Japan
  { id: '4', providerName: 'Airalo', providerLogo: 'https://picsum.photos/id/10/40/40', region: 'japan', dataAmount: '3 GB', dataValue: 3072, durationDays: 30, priceUsd: 8.50, speed: 'LTE', features: ['Softbank Network'], isGlobal: false, buyUrl: '#' },
  { id: '5', providerName: 'Ubigi', providerLogo: 'https://picsum.photos/id/14/40/40', region: 'japan', dataAmount: '10 GB', dataValue: 10240, durationDays: 30, priceUsd: 17.00, speed: '5G', features: ['High Speed', 'Low Latency'], isGlobal: false, buyUrl: '#' },
  
  // Europe
  { id: '6', providerName: 'Nomad', providerLogo: 'https://picsum.photos/id/11/40/40', region: 'europe', dataAmount: '20 GB', dataValue: 20480, durationDays: 30, priceUsd: 26.00, speed: 'LTE', features: ['35 Countries Included'], isGlobal: false, buyUrl: '#' },
  
  // Global
  { id: '7', providerName: 'Airalo', providerLogo: 'https://picsum.photos/id/10/40/40', region: 'global', dataAmount: '1 GB', dataValue: 1024, durationDays: 7, priceUsd: 9.00, speed: 'LTE', features: ['Works in 130 countries'], isGlobal: true, buyUrl: '#' },
];
