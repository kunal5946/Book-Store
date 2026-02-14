import axios from "axios";

export const generateTagsAndGenres = async (bookName) => {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "Return ONLY JSON in format {genres:[], tags:[]}. No text."
          },
          {
            role: "user",
            content: `Book: ${bookName}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = res.data.choices[0].message.content;

    console.log("AI raw:", text);

    const cleaned = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleaned);

    return {
      genres: data.genres || [],
      tags: data.tags || []
    };
  } catch (err) {
    console.log("AI error:", err.message);
    return { genres: [], tags: [] };
  }
};
