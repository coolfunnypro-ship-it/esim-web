
import { GoogleGenAI } from "@google/genai";
import { PLANS } from "../constants";

export const getAIRecommendation = async (userPrompt: string) => {
  // 根据环境注入 API_KEY
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined') {
    return "💡 AI 助手已就绪。请在环境变量中配置 API_KEY 以激活智能推荐功能。";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  try {
    const contextData = PLANS.map(p => ({
      provider: p.providerName,
      region: p.region,
      data: p.dataAmount,
      price: `$${p.priceUsd}`,
      isUnlimited: p.dataValue > 500000
    })).slice(0, 10);

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        你是一个全球旅行连接专家。用户正在寻找 eSIM 套餐。
        现有部分套餐参考：${JSON.stringify(contextData)}
        
        用户咨询："${userPrompt}"
        
        任务：
        1. 给出中文建议。
        2. 保持专业、精炼（不超过 80 字）。
        3. 如果现有数据中有合适的，请提及品牌；如果没有，请提供一般性省钱策略。
        4. 语气要像资深旅行博主。
      `,
    });

    return response.text || "根据您的目的地，建议优先选择包含 5G 信号且每 GB 单价低于 $3 的套餐。";
  } catch (error) {
    console.error("AI Error:", error);
    return "🤖 AI 助手正在云游，您可以先查看下方的实时比价列表，我们已为您精选了性价比最高的方案。";
  }
};
