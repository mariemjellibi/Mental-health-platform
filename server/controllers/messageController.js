import Message from "../models/Message.js";
import Sentiment from "sentiment";

const sentimentAnalyzer = new Sentiment({
  language: 'en',
  labels: { // Add required labels configuration
    positive: 'positive',
    negative: 'negative'
  },
  extras: {
    // ... keep your existing custom words and emojis ...
    'awful': -4,
    'terrible': -4,
    'heartbroken': -5,
    'excited': 4,
    '❤️': 3,
    '😊': 3,
    '😢': -3,
    '💔': -4,
    'lol': 2,
    'rofl': 3,
    'meh': -1,
    'sux': -2
  }
});

// Remove the registerLanguage call and use this instead:
sentimentAnalyzer.analyze = sentimentAnalyzer.analyze.bind(sentimentAnalyzer);
const generateCompassionateReply = (score, comparative) => {
  // Use comparative score (score per word) for better accuracy
  if (comparative < -1.5) {
    return "This sounds really difficult. I'm here for you. Would you like to share more?";
  }
  if (comparative < -0.5) {
    return "I'm sorry you're going through this. You're not alone in this.";
  }
  if (comparative < 0) {
    return "That sounds challenging. I'm listening. Take your time.";
  }
  if (comparative === 0) {
    return "Thank you for sharing. I'm here to support you however I can.";
  }
  if (comparative < 1) {
    return "It's good to hear positive things! Celebrate these moments.";
  }
  return "This sounds wonderful! I'm happy to hear you're feeling this way!";
};

// Main chat controller with improved analysis
export const handleChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    // Save user message
    const userMessage = await Message.create({
      user: userId,
      sender: 'user',
      message: message,
    });

    // Enhanced analysis
    const sentimentResult = sentimentAnalyzer.analyze(message);
    const { score, comparative } = sentimentResult;

    // Generate reply using both score and comparative
    const botText = generateCompassionateReply(score, comparative);

    // Save bot response
    const botMessage = await Message.create({
      user: userId,
      sender: 'bot',
      message: botText,
    });

    res.status(200).json({
      reply: botText,
      sentimentScore: score,
      comparativeScore: comparative,
      messages: [userMessage, botMessage],
    });
  } catch (err) {
    console.error('Chat Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get chat history remains the same

export const getChatHistory = async (req, res) => {
        try{
            const userId= req.user._id;
            const messages = await Message.find({ user: userId });
            res.status(200).json(messages);
        }catch(err){
            console.error('Chat History Error:', err);
            res.status(500).json({ error: 'Something went wrong on the server' });      
        }
    }