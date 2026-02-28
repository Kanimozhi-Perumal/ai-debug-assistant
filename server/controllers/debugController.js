import axios from "axios";
import History from "../models/History.js";
import dotenv from "dotenv";

dotenv.config();

export const debugCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        error: "Code and language are required"
      });
    }

    // 🔥 UPDATED ADVANCED PROMPT
    const prompt = `
You are an expert senior software engineer.

Analyze this ${language} code and return ONLY valid JSON in this format:

{
  "syntaxErrors": "",
  "logicErrors": "",
  "why": "",
  "fixedCode": "",
  "optimizedCode": "",
  "timeComplexity": "",
  "spaceComplexity": "",
  "optimizationPossible": "Yes or No",
  "severity": "Low | Medium | High",
  "confidence": "0-100%",
  "improvementSuggestions": [
    "Code quality improvement",
    "Best practice suggestion",
    "Performance improvement tip",
    "Naming suggestion"
  ]
}

If no syntax errors:
"No syntax errors found."

If no logical errors:
"No logical errors found."

Return raw JSON only.
Do NOT add markdown.
Do NOT add explanations outside JSON.

Code:
${code}
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

    const rawText =
      response.data.candidates[0].content.parts[0].text;

    let parsedData;

    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: rawText
      });
    }

    // ✅ Safe Defaults
    parsedData.syntaxErrors =
      parsedData.syntaxErrors || "No syntax errors found.";

    parsedData.logicErrors =
      parsedData.logicErrors || "No logical errors found.";

    parsedData.why =
      parsedData.why || "No major logical issues detected.";

    parsedData.fixedCode =
      parsedData.fixedCode || code;

    parsedData.optimizedCode =
      parsedData.optimizedCode || code;

    parsedData.timeComplexity =
      parsedData.timeComplexity || "Not specified";

    parsedData.spaceComplexity =
      parsedData.spaceComplexity || "Not specified";

    parsedData.optimizationPossible =
      parsedData.optimizationPossible || "No";

    parsedData.severity =
      parsedData.severity || "Low";

    parsedData.confidence =
      parsedData.confidence || "90%";

    parsedData.improvementSuggestions =
      parsedData.improvementSuggestions || [
        "Follow consistent naming conventions",
        "Add comments for clarity",
        "Handle edge cases properly",
        "Improve code structure for readability"
      ];

    // ✅ Save to MongoDB
    await History.create({
      code,
      language,
      ...parsedData
    });

    res.json(parsedData);

  } catch (error) {
    console.error("GEMINI ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: "AI Debugging Failed"
    });
  }
};