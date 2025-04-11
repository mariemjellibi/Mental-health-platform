import React, { useState, useEffect, useRef } from 'react';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/message/chat-history', {
          withCredentials: true,
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,
          },
        });
        const data = await response.json();
        setMessages(data);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to load chat history');
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { sender: 'user', message: input, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:5002/api/message/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        message: data.reply, 
        timestamp: new Date() 
      }]);
    } catch (err) {
      setError('Network error, please try again.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-teal-50">
      {/* Chat Header */}
      <div className="bg-white py-4 px-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-teal-600">Mental Health Support</h1>
        <p className="text-gray-600">We're here to help 24/7</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading chat history...</div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xl p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-teal-600 text-white ml-12' 
                    : 'bg-white border border-gray-200 mr-12'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-2 ${
                  msg.sender === 'user' ? 'text-teal-100' : 'text-gray-500'
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            Send
          </button>
        </form>

        {error && (
          <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;