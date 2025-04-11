// MeditationHome.jsx
import React from 'react';
import { Brain, Smile, Leaf, Heart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

export default function MeditationHome() {
  // const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Mindful Practices
          </h1>
          <p className="text-gray-600 text-lg">
            Find peace and balance through guided sessions
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <button 
            // onClick={() => navigate("/meditation/mindfulness")}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 text-left group"
          >
            <div className="flex items-start mb-4">
              <div className="p-3 bg-blue-100 rounded-xl mr-4">
                <Smile className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Mindfulness Meditation
                </h3>
                <p className="text-sm text-gray-600">
                  Cultivate present-moment awareness
                </p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate("/meditation/anxiety")}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
          >
            <div className="flex items-start mb-4">
              <div className="p-3 bg-green-100 rounded-xl mr-4">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Anxiety Relief
                </h3>
                <p className="text-sm text-gray-600">
                  Techniques to calm racing thoughts
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-white rounded-full p-4 shadow-sm">
            <img
              src="/mindfulness-illustration.svg" // Use a calming illustration
              alt="Peaceful mind"
              className="w-48 h-48"
            />
          </div>
        </div>
      </div>
    </div>
  );
}