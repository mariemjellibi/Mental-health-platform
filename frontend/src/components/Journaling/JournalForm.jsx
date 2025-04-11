import { useState } from 'react';
import { Feather } from 'lucide-react';

const JournalForm = ({ onSubmit, prompts }) => {
  const [entry, setEntry] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [title, setTitle] = useState(''); // New state for the title

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send both the title and content with the selected prompt
    onSubmit({ title, content: entry, prompt: prompts[selectedPrompt] });
    setEntry('');
    setTitle(''); // Clear title after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-blue-50 rounded-xl p-4">
        <p className="text-sm text-gray-600 mb-2">Today's prompt</p>
        <div className="flex gap-2 flex-wrap">
          {prompts.map((prompt, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setSelectedPrompt(index)}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedPrompt === index
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Title input field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your journal entry"
          className="w-full mt-2 p-4 text-gray-800 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
        />
      </div>

      {/* Entry textarea */}
      <div className="relative">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Start writing your thoughts here..."
          className="w-full h-64 p-4 text-gray-800 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 resize-none"
        />
        <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
          {entry.length}/1000
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Feather className="w-5 h-5" />
        Save Reflection
      </button>
    </form>
  );
};

export default JournalForm;
