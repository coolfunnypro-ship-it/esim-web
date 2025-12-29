
import React, { useState } from 'react';
import { getAIRecommendation } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const res = await getAIRecommendation(query);
    setResponse(res);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <i className="fa-solid fa-robot text-xl"></i>
        <h2 className="text-lg font-bold">AI 套餐助手</h2>
      </div>
      <form onSubmit={handleAsk} className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例如：我要去日本10天..."
          className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 pr-12 text-white"
        />
        <button type="submit" disabled={loading} className="absolute right-2 top-2 bg-white text-indigo-600 p-2 rounded-lg">
          {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
        </button>
      </form>
      {response && <div className="bg-white/10 rounded-xl p-4 text-sm leading-relaxed">{response}</div>}
    </div>
  );
};

export default AIAssistant;
