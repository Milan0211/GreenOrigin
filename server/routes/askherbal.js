import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 🔑 SerpAPI (Google Search)
    const response = await axios.get(
      "https://serpapi.com/search.json",
      {
        params: {
          q: question + " medicinal plant research",
          api_key: process.env.SERP_API_KEY,
          num: 3,
        },
      }
    );

    const results = response.data.organic_results;

    if (!results || results.length === 0) {
      return res.json({ answer: "No reliable data found." });
    }

    const answer = results
      .map((r, i) => `${i + 1}. ${r.snippet}`)
      .join("\n");

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI search failed" });
  }
});

export default router;
