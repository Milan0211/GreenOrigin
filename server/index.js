
// // import express from "express";
// // import cors from "cors";
// // import fetch from "node-fetch";

// // const app = express();
// // const PORT = 5001;

// // app.use(cors());
// // app.use(express.json());

// // app.post("/api/ask-herbal", async (req, res) => {
// //   const { question } = req.body;

// //   if (!question || question.trim() === "") {
// //     return res.json({ answer: "Please ask a valid question." });
// //   }

// //   try {
// //     const prompt = `
// // You are an expert in herbal and medicinal plants.

// // STRICT RULES (FOLLOW EXACTLY):
// // - Do NOT use bullets
// // - Do NOT use symbols like •, -, +, *
// // - Do NOT use bold or markdown
// // - Write in simple English
// // - Answer ONLY the question
// // - Each point must start on a new line
// // - Use numbering format like:
// // 1.
// // 2.
// // 3.
// // - Give every point in a new line without any extra formatting
// // - Explain a bit before listing the points, but keep it concise

// // Question:
// // ${question}
// // `;

// //     const response = await fetch("http://localhost:11434/api/generate", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json"
// //       },
// //       body: JSON.stringify({
// //         model: "llama3",
// //         prompt,
// //         stream: false
// //       })
// //     });

// //     const data = await response.json();

// //     // 🧹 EXTRA SAFETY CLEANING
// //     let answer = data.response
// //       .replace(/\*\*/g, "")
// //       .replace(/•/g, "")
// //       .replace(/\+/g, "")
// //       .replace(/- /g, "")
// //       .trim();

// //     res.json({ answer });

// //   } catch (error) {
// //     res.json({
// //       answer: "⚠️ Ollama is not running. Please start Ollama."
// //     });
// //   }
// // });

// // app.listen(PORT, () => {
// //   console.log(`✅ Ollama backend running on port ${PORT}`);
// // });



// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import fs from "fs";
// import fetch from "node-fetch";

// const app = express();
// const PORT = 5001;

// app.use(cors());

// const upload = multer({ dest: "uploads/" });

// app.post("/api/ask-herbal", upload.single("image"), async (req, res) => {
//   try {
//     const question = req.body.question;

//     if (!question) {
//       return res.json({ answer: "Please ask a valid question." });
//     }

//     let imageBase64 = null;

//     if (req.file) {
//       const imageBuffer = fs.readFileSync(req.file.path);
//       imageBase64 = imageBuffer.toString("base64");
//       fs.unlinkSync(req.file.path);
//     }

//     const response = await fetch("http://127.0.0.1:11434/api/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         model: "llama3",
//         prompt: question,
//         stream: false
//       })
//     });

//     const data = await response.json();

//     console.log("MODEL RESPONSE:", data);

//     res.json({
//       answer: data.response || "Model returned empty response."
//     });

//   } catch (error) {
//     console.error("ERROR:", error);
//     res.json({
//       answer: "Backend error. Check terminal."
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log("Backend running on http://localhost:5001");
// });


import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import fetch from "node-fetch";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

/* ================================
   IMAGE + TEXT HERBAL QA
================================ */
app.post("/api/ask-herbal", upload.single("image"), async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.json({ answer: "Please ask a valid question." });
    }

    let imageBase64 = null;

    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);
      imageBase64 = imageBuffer.toString("base64");
      fs.unlinkSync(req.file.path);
    }

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: imageBase64 ? "llava" : "llama3",
        prompt: question,
        images: imageBase64 ? [imageBase64] : [],
        stream: false
      })
    });

    const data = await response.json();

    res.json({
      answer: data.response || "Model returned empty response."
    });

  } catch (error) {
    console.error(error);
    res.json({
      answer: "Backend error."
    });
  }
});


/* ===================================
   AI REGION COMPARISON (NEW FEATURE)
=================================== */
app.post("/api/compare-region", async (req, res) => {
  try {
    const { herb, currentRegion, compareRegion } = req.body;

    const prompt = `
You are a scientific herbal quality analyst.

Compare ${herb} grown in ${currentRegion} and ${compareRegion}.

Give detailed comparison in this format:

Purity Level:
${currentRegion}:
${compareRegion}:

Active Compound Strength:
${currentRegion}:
${compareRegion}:

Medicinal Potency:
${currentRegion}:
${compareRegion}:

Aroma and Essential Oil Quality:
${currentRegion}:
${compareRegion}:

Environmental Influence:
Explain how soil, humidity, temperature affect quality.

Final Verdict:
Clearly state which region produces better quality and why.
Write in simple scientific English.
Do not use bullets.
`;

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt,
        stream: false
      })
    });

    const data = await response.json();

    res.json({
      result: data.response || "No comparison generated."
    });

  } catch (err) {
    console.error(err);
    res.json({
      result: "Error generating comparison."
    });
  }
});

app.listen(PORT, () => {
  console.log("Backend running on http://localhost:5001");
});
