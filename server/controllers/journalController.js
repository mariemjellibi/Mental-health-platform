import Journal from '../models/Journal.js';

// @desc    Create a new journal entry
// @route   POST /api/journals
// @access  Private
export const createJournal = async (req, res) => {
    const { title, content } = req.body;
  
    try {
      const journal = new Journal({
        userId: req.user._id, // From protectRoutes middleware
        title,
        content,
      });
  
      const createdJournal = await journal.save();
      res.status(201).json(createdJournal);
    } catch (error) {
      res.status(500).json({ message: 'Error creating journal', error });
    }
  };
  
  // @desc    Get all journal entries for a user
  // @route   GET /api/journals/:userId
  // @access  Private
  export const getJournals = async (req, res) => {
    // const { userId } = req.params;
    try{

  
    const userId = req.user._id;

  
    // try {
    //   // Optional: Only allow fetching if the logged-in user is the owner
    //   if (req.user._id.toString() !== userId) {
    //     return res.status(403).json({ message: 'Access denied' });
    //   }
  
    //   const journals = await Journal.find({ userId }).sort({ createdAt: -1 });
    //   res.status(200).json(journals);
    // } catch (error) {
    //   res.status(500).json({ message: 'Error fetching journals', error });
    // }
    const journals = await Journal.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journals', error });
  }
  };
  
  // @desc    Update a journal entry
  // @route   PUT /api/journals/:id
  // @access  Private
  export const updateJournal = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
  
    try {
      const journal = await Journal.findById(id);
  
      if (!journal) {
        return res.status(404).json({ message: 'Journal not found' });
      }
  
      // Ensure only the owner can update
      if (journal.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      journal.title = title || journal.title;
      journal.content = content || journal.content;
  
      const updated = await journal.save();
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: 'Error updating journal', error });
    }
  };
  
  // @desc    Delete a journal entry
  // @route   DELETE /api/journals/:id
  // @access  Private
  export const deleteJournal = async (req, res) => {
    const { id } = req.params;
  
    try {
      const journal = await Journal.findById(id);
  
      if (!journal) {
        return res.status(404).json({ message: 'Journal not found' });
      }
  
      // Ensure only the owner can delete
      if (journal.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await journal.deleteOne();
      res.status(200).json({ message: 'Journal deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting journal', error });
    }
  };
  