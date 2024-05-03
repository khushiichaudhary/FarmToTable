const express = require("express");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Parse incoming JSON data

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "YOUR_API_KEY";
async function runChat(userInput, history) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history,
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

const initialHistory = [
  // Predefined conversation history (replace with an empty array if not needed)
  {
    role: "user",
    parts: [{ text: "Hi" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Hi there!  Welcome to FarmToTable! What can I help you with today?  Perhaps you're looking for information about the benefits of organic produce or tips on selecting the freshest fruits and veggies?  Let me know how I can assist you in making informed choices for a healthy lifestyle! Remember, FarmToTable is your one-stop shop for the best quality organic produce, delivered straight from our farms to your table. ",
      },
    ],
  },
  // ... add more conversation history entries if desired
];

app.post("/chat", async (req, res) => {
  const userInput = req.body.userInput;
  const previousHistory = req.body.history || initialHistory; // Use provided history or default

  try {
    const responseText = await runChat(userInput, previousHistory);
    res.json({ responseText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
app.use(express.static("Google_AI_Hackathon_Farmer")); // Serve static files from the 'public' directory (replace with your directory name)
app.get("/", (req, res) => {
  res.redirect("/chatbot.html"); // Redirect to your main page
});
