import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const prompt = `
You are an expert senior software engineer and coding mentor.

Respond clearly and concisely.
If code is requested, provide clean formatted code.
Do not add unnecessary explanations.

User Question:
${message}
`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );

    const reply =
      response.data.candidates[0].content.parts[0].text;

    res.json({ reply });

  } catch (error) {
    console.error("GEMINI CHAT ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "AI Chat Failed"
    });
  }
};