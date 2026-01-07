import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const PORT = process.env.APP_PORT || 8000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ answer: "Please ask something." });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
You are an AI assistant for a backend developer portfolio.

Developer: Vicky Nana
Focus: backend systems, architectural decisions, trade-offs.

User question:
${question}

Answer clearly, concisely, and practically.
      `,
    });

    res.json({ answer: response.text });
  } catch (err) {
    if (err.status === 503) {
      return res.json({
        answer:
          "The AI service is temporarily busy. Please try again in a moment.",
      });
    }

    res.status(500).json({
      answer: "Unexpected error occurred.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
