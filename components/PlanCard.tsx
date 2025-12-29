
import React from 'react';
import { ESimPlan } from '../types';

interface PlanCardProps {
  plan: ESimPlan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <img src={plan.providerLogo} alt={plan.providerName} className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <h3 className="font-bold text-slate-800">{plan.providerName}</h3>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                {plan.speed}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">${plan.priceUsd.toFixed(2)}</div>
            <div className="text-xs text-slate-500">One-time payment</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex flex-col">
            <span className="text-slate-400">Data</span>
            <span className="font-semibold text-slate-700">{plan.dataAmount}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400">Validity</span>
            <span className="font-semibold text-slate-700">{plan.durationDays} Days</span>
          </div>
        </div>

        <div className="space-y-1 mb-6">
          {plan.features.slice(0, 2).map((f, i) => (
            <div key={i} className="flex items-center text-xs text-slate-600">
              <i className="fa-solid fa-check text-green-500 mr-2"></i>
              {f}
            </div>
          ))}
        </div>

        <button 
          onClick={() => window.open(plan.buyUrl, '_blank')}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <span>View Deal</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
