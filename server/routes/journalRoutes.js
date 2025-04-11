// routes/journalRoutes.js
import express from 'express';
import {
  createJournal,
  getJournals,
  deleteJournal,
  updateJournal
} from '../controllers/journalController.js';
import protectRoutes from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protectRoutes, createJournal); // Create
router.get('/all', protectRoutes, getJournals); // Read
router.put('/:id', protectRoutes, updateJournal); // Update
router.delete('/:id', protectRoutes, deleteJournal); // Delete

export default router;
