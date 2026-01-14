
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateGameBriefing = async (gameTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a short, 2-sentence "intellectual challenge" briefing for a participant about to play a game called "${gameTitle}". Use a serious, futuristic, and slightly intimidating tone.`,
      config: {
        maxOutputTokens: 100
      }
    });
    return response.text;
  } catch (error) {
    return `Initiating ${gameTitle} protocol. Error retrieving encrypted brief. Proceed with caution.`;
  }
};

export const getPostGameAnalysis = async (gameTitle: string, score: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `A user just scored ${score} in ${gameTitle}. Provide a one-sentence "high-intelligence" pseudo-scientific critique or encouragement in a futuristic tone.`,
      config: {
        maxOutputTokens: 100
      }
    });
    return response.text;
  } catch (error) {
    return "Neural synchronization complete. Data archived.";
  }
};
