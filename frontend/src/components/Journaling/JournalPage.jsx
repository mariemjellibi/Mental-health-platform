// // pages/JournalPage.jsx
// import axios from 'axios';
// import  JournalForm from "./JournalForm"
// import { BookOpen, Feather } from 'lucide-react';

// export default function JournalPage() {
//   const handleJournalSubmit = async (data) => {
//     try {
//       const token = localStorage.getItem('TOKEN');
//       console.log('Token:', token);
//       const res = await axios.post("http://localhost:5002/api/journal", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('Journal saved:', res.data);
//       // Fancy notification instead of alert
//       showNotification('Journal entry saved successfully 🌱');
//     } catch (err) {
//       console.error(err);
//       showNotification('Couldn\'t save entry - please try again', true);
//     }
//   };

//   const showNotification = (message, isError = false) => {
//     const notification = document.createElement('div');
//     notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
//       isError ? 'bg-rose-400' : 'bg-teal-400'
//     } animate-slide-in`;
//     notification.textContent = message;
//     document.body.appendChild(notification);
    
//     setTimeout(() => {
//       notification.remove();
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center mb-6">
//             {/* <div className="bg-teal-100 p-4 rounded-full">
//               <BookOpen className="w-12 h-12 text-teal-600" />
//             </div> */}
//           </div>
//           <h1 className="text-4xl font-serif font-medium text-gray-800 mb-3">
//             Mindful Journaling
//           </h1>
//           <p className="text-lg text-gray-600">
//             Reflect on your day with gentle prompts and peaceful thoughts
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
//           <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-6">
//             {/* <Feather className="w-6 h-6 text-teal-600" /> */}
//             <h2 className="text-xl font-serif text-gray-800">
//               Today's Reflection
//             </h2>
//           </div>
          
//           <JournalForm 
//             onSubmit={handleJournalSubmit}
//             prompts={[
//               "What brought you peace today?",
//               "What emotions are you sitting with?",
//               "What are you grateful for right now?"
//             ]}
//           />
//         </div>

//         <div className="mt-8 text-center text-gray-500 text-sm">
//           <p>Your entries are private and encrypted 🔒</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// pages/JournalPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import JournalForm from './JournalForm';
import JournalHistory from "./JournalHistory "
import { BookText, Clock, Plus } from 'lucide-react';

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState('new');
  const [isLoading, setIsLoading] = useState(true);
  const showNotification = (message, isError = false) => {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
          isError ? 'bg-rose-400' : 'bg-teal-400'
        } animate-slide-in`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.remove();
        }, 3000);
      };
    
  // Fetch journal entries
  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('TOKEN');
      const res = await axios.get("http://localhost:5002/api/journal/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleJournalSubmit = async (data) => {
    try {
      const token = localStorage.getItem('TOKEN');
      await axios.post("http://localhost:5002/api/journal/", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchEntries(); // Refresh entries after submission
      setActiveTab('history'); // Switch to history view
      showNotification('Entry saved 🌱');
    } catch (err) {
      console.error(err);
      showNotification('Error saving entry', true);
    }
  };

  // ... (keep the showNotification function from previous example)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-gray-800 mb-4">
            Mindful Journal
          </h1>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveTab('new')}
              className={`px-6 py-2 rounded-full flex items-center gap-2 ${
                activeTab === 'new' 
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Plus size={18} />
              New Entry
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-full flex items-center gap-2 ${
                activeTab === 'history' 
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Clock size={18} />
              Past Reflections
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {activeTab === 'new' ? (
            <div className="animate-fade-in">
              <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-6">
                <BookText className="w-6 h-6 text-teal-600" />
                <h2 className="text-xl font-serif text-gray-800">
                  Today's Reflection
                </h2>
              </div>
              <JournalForm 
                onSubmit={handleJournalSubmit}
                prompts={[
                  "What emotion needs attention today?",
                  "Where did you find moments of peace?",
                  "What are you grateful for in this moment?"
                ]}
              />
            </div>
          ) : (
            <div className="animate-fade-in">
              {isLoading ? (
                <div className="text-center py-12 text-gray-500">
                  Loading your reflections...
                </div>
              ) : (
                <JournalHistory 
                  entries={entries} 
                  onEntrySelect={() => setActiveTab('new')}
                />
              )}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="text-2xl font-serif text-teal-600">
              {entries.length}
            </div>
            <div className="text-sm text-gray-600">Total Entries</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="text-2xl font-serif text-teal-600">
              {new Date().toLocaleDateString('en-US', { month: 'long' })}
            </div>
            <div className="text-sm text-gray-600">Current Month</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="text-2xl font-serif text-teal-600">
              {entries.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).length}
            </div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}