// UserRoutes.js (inside pages/User or routes folder)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MeditationHome from '../../components/Meditation/MeditationHome';
import MeditationPage from '../../components/Meditation/MeditationPage';
import ChatComponent from '../../components/ChatComponent';
import JournalPage from '../../components/Journaling/JournalPage';

const UserRoutes = () => {
  return (
    <Routes>
      <Route index element={<div className="text-red-500 text-4xl p-4 bg-yellow-200">
      TEST VISIBILITY
    </div>} />
      <Route path="meditation" element={<MeditationHome />} />
      <Route path="meditation/mindfulness" element={<MeditationPage />} />
      <Route path="meditation/anxiety" element={<MeditationPage />} />
      <Route path="chat" element={<ChatComponent />} />
      <Route path="journal" element={<JournalPage />} />

    </Routes>
  );
};

export default UserRoutes;
