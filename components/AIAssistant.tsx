
import React, { useState } from 'react';
import { getAIRecommendation } from '../services/geminiService.ts';

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
        <div className="bg-white/20 p-2 rounded-lg">
          <i className="fa-solid fa-robot text-xl"></i>
        </div>
        <div>
          <h2 className="text-lg font-bold">Plan Finder AI</h2>
          <p className="text-sm text-blue-100">Ask anything about your trip connectivity</p>
        </div>
      </div>

      <form onSubmit={handleAsk} className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., I'm going to Japan for 10 days, need lots of data..."
          className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-blue-200"
        />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
        </button>
      </form>

      {response && (
        <div className="bg-white/10 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm leading-relaxed">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
