import React from 'react';

export default function MeditationPage({ category }) {
  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center justify-start px-4 py-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <p className="text-sm text-purple-500">FOCUS SESSION</p>
          <div className="text-5xl my-4">🎧</div>
          <h2 className="text-xl font-semibold text-purple-800">
            Calm & Concentration ({category})
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
          <p className="text-3xl text-purple-700 font-bold mb-2">25:00</p>
          <p className="text-sm text-purple-600">Session Duration</p>
        </div>
        <div className="flex justify-around mb-10">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-md font-medium">Start</button>
          <button className="bg-purple-200 text-purple-700 px-6 py-2 rounded-full shadow-md font-medium">Reset</button>
        </div>
      </div>
    </div>
  );
}
