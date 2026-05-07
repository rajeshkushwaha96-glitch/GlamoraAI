import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real production app, ensure API_KEY is handled securely. 
// For this demo, we assume it's available in the env.

const ai = new GoogleGenAI({ apiKey });

export const processImageWithGemini = async (
  base64Image: string,
  prompt: string,
  mimeType: string = 'image/png'
): Promise<string> => {
  try {
    // Clean base64 string if it contains the data url prefix
    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
        ],
      },
    });

    // Check for image in response parts
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
           return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data returned from AI model. It might have refused the request or returned only text.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
