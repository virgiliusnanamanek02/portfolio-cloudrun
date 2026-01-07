import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ answer: "Please ask something." });
  }

  // GEMINI API
  return res.json({
    answer:
      "This portfolio focuses on backend decision-making and architectural trade-offs.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
