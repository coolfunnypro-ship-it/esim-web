
import React, { useState, useMemo } from 'react';
import { REGIONS, PLANS } from './constants.tsx';
import PlanCard from './components/PlanCard.tsx';
import AIAssistant from './components/AIAssistant.tsx';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'data' | 'relevance'>('relevance');

  const filteredPlans = useMemo(() => {
    let result = PLANS.filter(plan => {
      const matchesSearch = plan.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plan.region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || plan.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });

    if (sortBy === 'price') {
      result.sort((a, b) => a.priceUsd - b.priceUsd);
    } else if (sortBy === 'data') {
      result.sort((a, b) => b.dataValue - a.dataValue);
    }

    return result;
  }, [searchTerm, selectedRegion, sortBy]);

  return (
    <div className="min-h-screen flex flex-col text-slate-900">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <i className="fa-solid fa-signal text-white"></i>
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">eSimGlobal</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
              <a href="#how-it-works" className="text-slate-600 hover:text-indigo-600 transition-colors">使用流程</a>
              <a href="#compare" className="text-slate-600 hover:text-indigo-600 transition-colors">套餐比价</a>
              <a href="#providers" className="text-slate-600 hover:text-indigo-600 transition-colors">合作商</a>
              <button className="bg-slate-900 text-white px-6 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95">
                立即登录
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <header className="relative overflow-hidden pt-16 pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-6">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                已覆盖全球 190+ 国家
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                告别昂贵漫游 <br/>
                一键开启 <span className="text-indigo-600">全球连接</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
                实时对比全球 100+ 运营商套餐，平均为每位旅客节省 <span className="text-slate-900 font-bold">85%</span> 的流量费用。
              </p>
              
              <div className="max-w-md">
                <div className="relative group">
                  <i className="fa-solid fa-location-dot absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
                  <input
                    type="text"
                    placeholder="输入你想去的国家，如：日本、美国..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-4 py-5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none bg-white shadow-sm text-lg"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {REGIONS.filter(r => r.popular).slice(0, 4).map(region => (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region.id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedRegion === region.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300'}`}
                    >
                      {region.flagEmoji} {region.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <AIAssistant />
            </div>
          </div>
        </div>
      </header>

      {/* 流程说明 */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-16">只需三步，即刻出发</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: 'fa-magnifying-glass', title: '搜索目的地', desc: '输入目的地，AI 为你智能匹配最佳套餐' },
              { icon: 'fa-credit-card', title: '对比并购买', desc: '挑选最便宜或流量最多的方案，在线极速支付' },
              { icon: 'fa-qrcode', title: '扫码即用', desc: '通过二维码瞬间激活 eSIM，无需换卡' }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
                  <i className={`fa-solid ${step.icon} text-2xl text-indigo-600 group-hover:text-white`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 套餐列表 */}
      <main id="compare" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-6 md:space-y-0">
          <div>
            <div className="text-indigo-600 font-bold text-sm tracking-widest uppercase mb-2">对比引擎</div>
            <h2 className="text-4xl font-extrabold text-slate-900">
              {selectedRegion === 'all' ? '精选全球套餐' : `${REGIONS.find(r => r.id === selectedRegion)?.name} 最优方案`}
            </h2>
          </div>

          <div className="flex items-center space-x-3 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200">
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent px-4 py-2 text-sm font-semibold focus:outline-none border-r border-slate-100"
            >
              <option value="all">🌍 全部地区</option>
              {REGIONS.map(r => (
                <option key={r.id} value={r.id}>{r.flagEmoji} {r.name}</option>
              ))}
            </select>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent px-4 py-2 text-sm font-semibold focus:outline-none"
            >
              <option value="relevance">综合排序</option>
              <option value="price">价格最低</option>
              <option value="data">流量最多</option>
            </select>
          </div>
        </div>

        {filteredPlans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPlans.map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-magnifying-glass text-3xl text-slate-300"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-700">未找到匹配套餐</h3>
            <p className="text-slate-500 mt-2">换个关键词试试，或者联系我们添加该地区套餐</p>
            <button 
              onClick={() => { setSelectedRegion('all'); setSearchTerm(''); }}
              className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
            >
              重置筛选条件
            </button>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-signal text-white"></i>
                </div>
                <span className="text-xl font-extrabold text-white">eSimGlobal</span>
              </div>
              <p className="text-sm leading-relaxed mb-8">
                全球领先的 eSIM 数字化连接平台。致力于消除国际漫游壁垒，让每一位旅客都能享受平价、高速的网络服务。
              </p>
              <div className="flex space-x-5">
                {[ 'twitter', 'facebook', 'instagram', 'linkedin'].map(social => (
                  <a key={social} href="#" className="hover:text-white transition-colors text-lg">
                    <i className={`fa-brands fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-8">目的地</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">热门目的地</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">欧洲全境</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">北美漫游</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">亚洲快速连接</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-8">公司</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">关于我们</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">合作伙伴计划</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">隐私条款</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">联系支持</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-8">订阅优惠</h4>
              <p className="text-sm mb-6">订阅我们的周报，获取最新的旅行折扣和技术动态。</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="输入邮箱" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-5 rounded-lg hover:bg-indigo-500 transition-colors">
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>© 2024 eSimGlobal. 让连接触手可及。</p>
            <div className="flex space-x-8 mt-4 md:mt-0 uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="hover:text-white transition-colors">使用协议</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
