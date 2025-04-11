// components/JournalHistory.jsx
import { useState, useEffect } from 'react';
import { BookOpenText, CalendarDays, Search, HeartPulse } from 'lucide-react';

const JournalHistory = ({ entries }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const filtered = entries.filter(entry =>
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
    setFilteredEntries(filtered);
  }, [searchQuery, sortBy, entries]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <HeartPulse className="w-8 h-8 text-teal-600" />
          <h1 className="text-3xl font-serif text-gray-800">Reflection Archive</h1>
        </div>
        <p className="text-gray-600">Your journey through self-discovery</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-lg border border-gray-200 bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Entries Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEntries.map((entry) => (
          <div 
            key={entry.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
          >
            <div className="p-6">
              {/* Entry Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <BookOpenText className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    {new Date(entry.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </h3>
                  <p className="text-sm text-gray-500">{entry.mood || 'General Reflection'}</p>
                </div>
              </div>

              {/* Entry Preview */}
              <div className="space-y-4">
                <p className="text-sm text-gray-600 font-medium">
                  "{entry.prompt}"
                </p>
                <p className="text-gray-600 line-clamp-3 text-sm">
                  {entry.content}
                </p>
                <button
                  onClick={() => setSelectedEntry(entry)}
                  className="text-teal-600 hover:text-teal-700 text-sm flex items-center gap-1"
                >
                  Read Full Entry
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Entry Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative">
            <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-medium text-gray-800">
                {new Date(selectedEntry.createdAt).toLocaleDateString()}
              </h2>
            </div>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Journal Prompt</p>
                <p className="text-gray-800 font-medium">"{selectedEntry.prompt}"</p>
              </div>
              <div className="prose max-w-none text-gray-700">
                {selectedEntry.content}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4 text-gray-400 mx-auto">
            <BookOpenText className="w-12 h-12 inline-block" />
          </div>
          <p className="text-gray-600">No entries found. Your future reflections await.</p>
        </div>
      )}
    </div>
  );
};

export default JournalHistory;