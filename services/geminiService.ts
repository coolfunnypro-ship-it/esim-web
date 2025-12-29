
import { GoogleGenAI } from "@google/genai";
import { PLANS } from "../constants";

export const getAIRecommendation = async (userPrompt: string) => {
  // 直接尝试获取注入的 API_KEY
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    console.warn("Gemini API Key is missing.");
    return "💡 AI 助手已就绪。请在环境变量中配置 API_KEY 以激活智能选包建议。";
  }

  // 严格遵守规范：new GoogleGenAI({ apiKey: process.env.API_KEY })
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const contextData = PLANS.map(p => ({
      provider: p.providerName,
      region: p.region,
      data: p.dataAmount,
      price: `$${p.priceUsd}`
    })).slice(0, 10);

    // 严格遵守规范：直接调用 ai.models.generateContent
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        你是一个专业的旅行 eSIM 顾问。根据以下部分套餐数据推荐最适合用户的方案：
        ${JSON.stringify(contextData)}
        
        用户需求："${userPrompt}"
        
        要求：使用中文，回答要口语化且专业，控制在 80 字以内。
      `,
    });

    // 严格遵守规范：使用 response.text 获取结果
    return response.text || "根据您的目的地，建议选择性价比最高的大流量包。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "🤖 AI 正在整理行囊，请先参考下方的实时比价列表。";
  }
};
