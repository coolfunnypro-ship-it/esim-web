
import React from 'react';
import { ESimPlan } from '../types';

interface PlanCardProps {
  plan: ESimPlan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const pricePerGb = plan.dataValue === 999999 
    ? (plan.priceUsd / 50).toFixed(2) // 假设无限流量等同于50GB进行性价比对比
    : (plan.priceUsd / (plan.dataValue / 1024)).toFixed(2);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={plan.providerLogo} alt={plan.providerName} className="w-12 h-12 rounded-xl object-cover border border-gray-100" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                <i className={`fa-solid ${plan.speed === '5G' ? 'fa-bolt text-amber-500' : 'fa-signal text-gray-400'} text-[10px]`}></i>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{plan.providerName}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded tracking-wider">
                  {plan.speed}
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                  {plan.isGlobal ? '全球通用' : '地区套餐'}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-gray-900">${plan.priceUsd.toFixed(2)}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">一次性支付</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-xl">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">流量容量</span>
            <span className="text-lg font-extrabold text-gray-900">{plan.dataAmount}</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-200"></div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">有效期</span>
            <span className="text-lg font-extrabold text-gray-900">{plan.durationDays} 天</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 px-1">
          <div className="text-sm font-medium text-green-600 flex items-center">
            <i className="fa-solid fa-tag mr-1.5 text-xs"></i>
            每 GB 仅需 ${pricePerGb}
          </div>
        </div>

        <button 
          onClick={() => window.open(plan.buyUrl, '_blank')}
          className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
        >
          <span>立即订购</span>
          <i className="fa-solid fa-chevron-right text-[10px]"></i>
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
