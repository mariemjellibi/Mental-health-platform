// pages/User/UserHome.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Smile, BookOpen, Activity, Award } from 'lucide-react';
import axios from 'axios';

const UserHome = () => {
  const { user } = useAuth(); // Get user from your auth context
  const [stats, setStats] = useState(null);
  const [dailyQuote, setDailyQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [statsRes, quoteRes] = await Promise.all([
          axios.get('/api/user/stats', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('/api/daily-quote')
        ]);

        setStats(statsRes.data);
        setDailyQuote(quoteRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            {/* Skeleton loading states */}
            <div className="h-12 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Personalized Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back, <span className="text-teal-600">{user?.name}</span> 🌼
          </h1>
          <p className="text-gray-600">Here's your mental wellness overview</p>
        </div>

        {/* Dynamic Daily Affirmation */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-teal-100">
          <div className="flex items-center gap-4">
            <div className="bg-teal-100 p-3 rounded-xl">
              <Smile className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Daily Affirmation</h2>
              <p className="text-gray-600">
                {user?.affirmationPreference || "I am worthy of peace and happiness"}
              </p>
            </div>
          </div>
        </div>

        {/* Personalized Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Mood Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{stats?.currentMood?.emoji || '😊'}</span>
              <div>
                <h3 className="text-gray-500 text-sm">Current Mood</h3>
                <p className="text-xl font-semibold text-gray-800">
                  {stats?.currentMood?.label || 'Positive'}
                </p>
                {stats?.moodHistory && (
                  <p className="text-sm text-gray-500 mt-1">
                    {stats.moodHistory}% better than last week
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Journal Streak with Progress */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="text-gray-500 text-sm">Journal Streak</h3>
                <p className="text-xl font-semibold text-gray-800">
                  {stats?.journalStreak || 0} Days 🔥
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((stats?.journalStreak / 7) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Meditation Time with History */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <Activity className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-gray-500 text-sm">Mindfulness</h3>
                <p className="text-xl font-semibold text-gray-800">
                  {stats?.weeklyMeditation || 0} mins
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats?.meditationGoalProgress || 0}% of weekly goal
                </p>
              </div>
            </div>
          </div>

          {/* Personalized Achievements */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-yellow-600" />
              <div>
                <h3 className="text-gray-500 text-sm">Achievements</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {stats?.recentAchievements?.map((achievement, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link 
            to="/userpage/journal" 
            className="bg-teal-600 hover:bg-teal-700 p-6 rounded-xl text-white transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">📝</span>
              <div>
                <h3 className="text-xl font-semibold">Continue Journaling</h3>
                <p className="opacity-90">
                  {stats?.lastJournalEntry 
                    ? `Last entry: ${new Date(stats.lastJournalEntry).toLocaleDateString()}`
                    : 'Start your reflection journey'}
                </p>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/userpage/meditation" 
            className="bg-purple-600 hover:bg-purple-700 p-6 rounded-xl text-white transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">🧘</span>
              <div>
                <h3 className="text-xl font-semibold">
                  {stats?.meditationSuggested ? 'Recommended Practice' : 'Start Meditation'}
                </h3>
                <p className="opacity-90">
                  {stats?.meditationSuggested || 'Find your center'}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Personalized Quote Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="text-center">
            <span className="text-4xl mb-4 inline-block">💬</span>
            <blockquote className="text-xl italic text-gray-800 mb-4">
              "{dailyQuote?.text}"
            </blockquote>
            <p className="text-gray-600">- {dailyQuote?.author}</p>
            {user?.quotePreferences && (
              <p className="mt-2 text-sm text-gray-500">
                Chosen based on your preference for {user.quotePreferences.join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;