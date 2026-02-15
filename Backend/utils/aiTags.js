import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const generateTagsAndGenres = async (bookName) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Return ONLY JSON.

Book: ${bookName}

Format:
{
 "genres": ["..."],
 "tags": ["..."]
}`
    });

    const text = response.text;

    console.log("Gemini raw:", text);

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      genres: parsed.genres || [],
      tags: parsed.tags || []
    };

  } catch (err) {
    console.log("Gemini error:", err);
    return { genres: [], tags: [] };
  }
};
