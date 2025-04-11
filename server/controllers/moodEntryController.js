// moodEntryController.js
import MoodEntry from '../models/MoodEntry.js';  // Import the MoodEntry model
export const addMoodEntry = async (req, res) => {
    try {
      const { mood, note } = req.body;  // User mood and optional note
  
      if (!mood || !['happy', 'sad', 'anxious', 'angry', 'neutral', 'excited', 'tired'].includes(mood)) {
        return res.status(400).json({ error: 'Invalid mood' });
      }
  
      const moodEntry = new MoodEntry({
        user: req.user._id,  // User ID from the authenticated user
        mood,
        note,
      });
  
      await moodEntry.save();
  
      res.status(200).json(moodEntry);
    } catch (err) {
      console.error('Error saving mood entry:', err);
      res.status(500).json({ error: 'Failed to save mood entry' });
    }
  };
  