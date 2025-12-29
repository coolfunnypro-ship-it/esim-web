
import { GoogleGenAI } from "@google/genai";
import { PLANS } from "../constants.tsx";

export const getAIRecommendation = async (userPrompt: string) => {
  // 安全获取 API KEY，防止在某些浏览器环境下由于 process 未定义导致崩溃
  let apiKey = '';
  try {
    apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY || '' : '';
  } catch (e) {
    console.warn("Process environment not accessible");
  }
  
  if (!apiKey || apiKey === 'undefined') {
    return "💡 请先在环境变量中配置 API_KEY 以激活 AI 助手。";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    // 提取部分套餐数据作为 AI 的上下文背景
    const contextData = PLANS.map(p => ({
      provider: p.providerName,
      region: p.region,
      data: p.dataAmount,
      price: `$${p.priceUsd}`,
      validity: `${p.durationDays}天`
    })).slice(0, 10);

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        你是一个专业的全球旅行通信专家。
        现有套餐数据背景：${JSON.stringify(contextData)}
        
        用户问题："${userPrompt}"
        
        要求：
        1. 请用中文回答。
        2. 回答要简洁、专业、热情（100字以内）。
        3. 如果背景数据中有匹配的地区，请优先推荐。
        4. 如果没有匹配数据，请根据常识提供一般性建议。
      `,
    });

    return response.text || "根据您的需求，我建议您查看我们的热门地区套餐，它们通常性价比最高！";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("API key not valid")) {
      return "❌ API Key 无效，请检查配置。";
    }
    return "🤖 AI 助手正在维护中，您可以直接查看下方的套餐列表。";
  }
};
