
import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

const SYSTEM_PROMPT = `
You are Lumina, an elite personal shopping assistant for "Lumina Luxe".
Your goal is to help users find products, offer styling advice, and answer questions about the catalog.

Current Product Catalog:
${MOCK_PRODUCTS.map(p => `- ${p.name} ($${p.price}): ${p.description} (Category: ${p.category})`).join('\n')}

Guidelines:
1. Be helpful, professional, and sophisticated.
2. If a user asks for recommendations, refer to the catalog items.
3. If they ask for something not in the catalog, politely explain we don't carry it yet but suggest the closest alternative.
4. Keep responses concise and use Markdown for formatting.
5. You can mention that shipping is free on orders over $100.
`;

export async function getChatResponse(history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    // Initialize inside the function to be safer and ensure the current API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting to my brain right now. Please try again in a moment!";
  }
}
