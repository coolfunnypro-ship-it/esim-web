
import React, { useState, useMemo } from 'react';
import { REGIONS, PLANS, PROVIDERS } from './constants';
import PlanCard from './components/PlanCard';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price_asc' | 'data_desc' | 'price_gb_asc'>('price_gb_asc');

  const filteredPlans = useMemo(() => {
    let result = PLANS.filter(plan => {
      const regionData = REGIONS.find(r => r.id === plan.region);
      const searchStr = `${plan.providerName} ${plan.region} ${regionData?.name || ''}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || plan.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });

    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.priceUsd - b.priceUsd);
    } else if (sortBy === 'data_desc') {
      result.sort((a, b) => b.dataValue - a.dataValue);
    } else if (sortBy === 'price_gb_asc') {
      result.sort((a, b) => {
        const valA = a.dataValue === 999999 ? a.priceUsd / 50 : a.priceUsd / (a.dataValue / 1024);
        const valB = b.dataValue === 999999 ? b.priceUsd / 50 : b.priceUsd / (b.dataValue / 1024);
        return valA - valB;
      });
    }

    return result;
  }, [searchTerm, selectedRegion, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 glass-nav border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <i className="fa-solid fa-bolt text-white"></i>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">eSimGlobal</span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <a href="#search" className="text-gray-600 hover:text-indigo-600">找套餐</a>
              <a href="#providers" className="text-gray-600 hover:text-indigo-600">合作商</a>
              <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">管理我的 eSIM</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 搜索区域 */}
      <header id="search" className="hero-gradient pt-20 pb-24 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            全球 eSIM 套餐对比引擎
          </h1>
          <p className="text-xl text-indigo-100 mb-10">
            在 190+ 国家中寻找最便宜、最快速的移动数据套餐
          </p>
          
          <div className="relative max-w-2xl mx-auto mb-8">
            <i className="fa-solid fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              placeholder="你想去哪里？输入国家或地区..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-5 rounded-2xl text-gray-900 shadow-2xl focus:ring-4 focus:ring-white/20 outline-none text-lg font-medium"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {REGIONS.filter(r => r.popular).map(region => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  selectedRegion === region.id 
                  ? 'bg-white text-indigo-600 border-white' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                {region.flagEmoji} {region.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <main className="max-w-7xl mx-auto px-4 py-12 w-full grid lg:grid-cols-4 gap-8">
        {/* 左侧筛选栏 */}
        <aside className="lg:col-span-1 space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-gray-200 custom-shadow">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <i className="fa-solid fa-sliders mr-2 text-indigo-600"></i> 智能筛选
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">排序方式</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="price_gb_asc">性价比最高 (每GB单价)</option>
                  <option value="price_asc">价格最低</option>
                  <option value="data_desc">流量最多</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">目的地</label>
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="all">🌍 全球所有目的地</option>
                  {REGIONS.map(r => (
                    <option key={r.id} value={r.id}>{r.flagEmoji} {r.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <AIAssistant />
        </aside>

        {/* 右侧套餐列表 */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              找到 {filteredPlans.length} 个最佳套餐
            </h2>
            <div className="text-sm text-gray-500">
              最后更新: 刚刚
            </div>
          </div>

          {filteredPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPlans.map(plan => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-gray-200">
              <i className="fa-solid fa-plane-slash text-6xl text-gray-200 mb-6"></i>
              <h3 className="text-xl font-bold text-gray-700">未找到匹配套餐</h3>
              <p className="text-gray-500 mt-2">试试搜索其他目的地或清除筛选条件</p>
            </div>
          )}
        </div>
      </main>

      {/* 合作商展示 */}
      <section id="providers" className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">主流 eSIM 运营商支持</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {PROVIDERS.map(p => (
              <div key={p.name} className="flex items-center space-x-2 grayscale hover:grayscale-0 transition cursor-help" title={p.description}>
                <img src={p.logo} alt={p.name} className="w-10 h-10 rounded-full" />
                <span className="font-bold text-lg text-gray-800">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-2 text-white mb-6">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <i className="fa-solid fa-bolt text-xs"></i>
              </div>
              <span className="text-xl font-bold">eSimGlobal</span>
            </div>
            <p className="text-sm leading-relaxed">
              您的全球旅行伴侣。我们通过对比全球数百家运营商的实时价格，为您找到最合适的连接方案。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">热门地区</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">美国 eSIM</a></li>
                <li><a href="#" className="hover:text-white">日本 eSIM</a></li>
                <li><a href="#" className="hover:text-white">欧洲 区域</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">关于我们</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">合作咨询</a></li>
                <li><a href="#" className="hover:text-white">隐私条款</a></li>
                <li><a href="#" className="hover:text-white">常见问题</a></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">联系我们</h4>
            <p className="text-sm mb-4">如有任何问题，欢迎通过以下方式联系：</p>
            <a href="mailto:support@esimglobal.com" className="text-indigo-400 hover:text-indigo-300 font-medium">support@esimglobal.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
