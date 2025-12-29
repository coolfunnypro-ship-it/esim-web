
import { ESimPlan, Region, Provider } from './types';

export const REGIONS: Region[] = [
  { id: 'usa', name: '美国', flagEmoji: '🇺🇸', popular: true },
  { id: 'japan', name: '日本', flagEmoji: '🇯🇵', popular: true },
  { id: 'uk', name: '英国', flagEmoji: '🇬🇧', popular: false },
  { id: 'thailand', name: '泰国', flagEmoji: '🇹🇭', popular: true },
  { id: 'france', name: '法国', flagEmoji: '🇫🇷', popular: false },
  { id: 'germany', name: '德国', flagEmoji: '🇩🇪', popular: false },
  { id: 'europe', name: '欧洲区域', flagEmoji: '🇪🇺', popular: true },
  { id: 'global', name: '全球漫游', flagEmoji: '🌎', popular: true },
  { id: 'china', name: '中国', flagEmoji: '🇨🇳', popular: true },
  { id: 'korea', name: '韩国', flagEmoji: '🇰🇷', popular: true },
];

export const PROVIDERS: Provider[] = [
  { name: 'Airalo', rating: 4.8, description: '全球首家 eSIM 商店，覆盖面最广。', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AR&backgroundColor=FF8000' },
  { name: 'Nomad', rating: 4.5, description: '界面友好，经常有大流量折扣。', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=NM&backgroundColor=4F46E5' },
  { name: 'Holafly', rating: 4.7, description: '主打无限流量套餐，适合重度用户。', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=HF&backgroundColor=FF4D4D' },
  { name: 'Yesim', rating: 4.2, description: '支持按需购买，灵活度极高。', logo: 'https://api.dicebear.com/7.x/initials/svg?seed=YS&backgroundColor=00D1B2' },
];

export const PLANS: ESimPlan[] = [
  // 美国
  { id: 'u1', providerName: 'Airalo', providerLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=AR', region: 'usa', dataAmount: '1 GB', dataValue: 1024, durationDays: 7, priceUsd: 4.50, speed: '5G', features: ['AT&T 网络', '原生速度'], isGlobal: false, buyUrl: '#' },
  { id: 'u2', providerName: 'Nomad', providerLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=NM', region: 'usa', dataAmount: '10 GB', dataValue: 10240, durationDays: 30, priceUsd: 18.00, speed: '5G', features: ['T-Mobile 网络', '可热点分享'], isGlobal: false, buyUrl: '#' },
  { id: 'u3', providerName: 'Holafly', providerLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=HF', region: 'usa', dataAmount: 'Unlimited', dataValue: 999999, durationDays: 15, priceUsd: 47.00, speed: '5G', features: ['无限流量', '无速度限制'], isGlobal: false, buyUrl: '#' },
  
  // 日本
  { id: 'j1', providerName: 'Airalo', providerLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=AR', region: 'japan', dataAmount: '3 GB', dataValue: 3072, durationDays: 30, priceUsd: 8.50, speed: 'LTE', features: ['Softbank 网络'], isGlobal: false, buyUrl: '#' },
  { id: 'j2', providerName: 'Ubigi', providerLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=UB', region: 'japan', dataAmount: '10 GB', dataValue: 10240, durationDays: 30, priceUsd: 17.00, speed: '5G', features: ['原生低延迟'], isGlobal: false, buyUrl: '#' },
  
  // 欧洲
  { id: 'e1', providerName: 'Nomad', providerLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=NM', region: 'europe', dataAmount: '20 GB', dataValue: 20480, durationDays: 30, priceUsd: 26.00, speed: 'LTE', features: ['支持 35 个欧洲国家'], isGlobal: false, buyUrl: '#' },
  
  // 中国
  { id: 'c1', providerName: 'Yesim', providerLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=YS', region: 'china', dataAmount: '5 GB', dataValue: 5120, durationDays: 15, priceUsd: 12.50, speed: '5G', features: ['直连中国电信', '免 VPN'], isGlobal: false, buyUrl: '#' },

  // 全球
  { id: 'g1', providerName: 'Airalo', providerLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=AR', region: 'global', dataAmount: '1 GB', dataValue: 1024, durationDays: 7, priceUsd: 9.00, speed: 'LTE', features: ['覆盖 130 个国家'], isGlobal: true, buyUrl: '#' },
];
