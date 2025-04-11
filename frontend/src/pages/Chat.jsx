import React from 'react'
import axios from 'axios'
const Chat = () => {
    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('TOKEN'); // Retrieve the token
    console.log('Token:', token); // Log the token for debugging
            // Check if token exists
            if (!token) {
                console.error('No token found');
                return;
            }
    
            // Make the request with token in the Authorization header
            const response = await axios.get(
                'http://localhost:5002/api/message/chat-history',
                {
                    withCredentials: true, // Important if you're using cookies
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data); // Handle response
        } catch (error) {
            console.error('Error fetching messages:', error.response || error.message || error);
        }
    };
    
      
  return (
    <div>
        <h1 className='text-4xl font-bold text-teal-600 mb-2'>Chat Page</h1>
        <button onClick={fetchMessages} className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-200">Fetch Messages</button>
    </div>
  )
}

export default Chat