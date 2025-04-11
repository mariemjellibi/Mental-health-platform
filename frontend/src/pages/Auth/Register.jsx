import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../context/authService';
import { useAuth } from '../../context/AuthContext'; // Import useAuth to access setUser

const Register = () => {
  const { setUser } = useAuth(); // Get setUser function from context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    language: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.age < 12 || formData.age > 120) {
      setError('Please enter a valid age between 12 and 120');
      return;
    }

    try {
      const user = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        gender: formData.gender,
        language: formData.language
      });
      // Set user in context after successful registration
      setUser(user);
      navigate('/userpage'); // Redirect to chat or other page after registration
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-teal-600 mb-2">Create Account</h2>
          <p className="text-gray-600">Start your mental health journey</p>
        </div>

        {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="12"
                max="120"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="tamil">Tamil</option>
                <option value="telugu">Telugu</option>
                <option value="kannada">Kannada</option>
                <option value="français">Français</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                placeholder="Create password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            href="/login" 
            onClick={() => navigate('/login')}
            className="font-medium text-teal-600 hover:text-teal-700"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
