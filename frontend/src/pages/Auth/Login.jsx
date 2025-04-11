import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';
//import API from '../../services/api';
const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out both fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('TOKEN', response.data.token);
        setUser(response.data.user);
        navigate("/userpage");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-600 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your wellness journey</p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            href="/signup" 
            className="font-medium text-teal-600 hover:text-teal-700" onClick={() => navigate('/register')}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;