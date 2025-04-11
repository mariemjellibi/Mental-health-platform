// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Navbar = () => {
  return (
    <nav className="bg-teal-600 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">YourApp</div>
        <div className="space-x-4">
          <Link to="/userpage" className="text-white hover:text-purple-300">Home</Link>
          <Link to="/userpage/chat" className="text-white hover:text-purple-300">Chat</Link>
          <Link to="/userpage/focus" className="text-white hover:text-purple-300">Focus</Link>
          <Link to="/userpage/journal" className="text-white hover:text-purple-300">Journaling</Link>

          <Link to="/userpage/meditation" className="text-white hover:text-purple-300">Meditation</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Home, MessageCircle, Compass, User } from 'lucide-react';

// const Navbar = () => {
//   return (
//     <nav className="bg-white border-b border-gray-100 py-4 px-6">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         {/* <Link to="/" className="flex items-center">
//           <span className="text-2xl text-blue-600">🌿</span>
//           <span className="ml-2 text-xl font-semibold text-gray-800">SereneMind</span>
//         </Link> */}
        
//         <div className="flex space-x-6">
//           <Link 
//             to="/userpage" 
//             className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <Home className="w-5 h-5 mr-1" />
//             Home
//           </Link>
//           <Link 
//             to="/userpage/chat" 
//             className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <MessageCircle className="w-5 h-5 mr-1" />
//             Support
//           </Link>
//           <Link 
//             to="/focus" 
//             className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <Compass className="w-5 h-5 mr-1" />
//             Focus
//           </Link>
//           <Link 
//             to="/userpage/meditation" 
//             className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <span className="text-xl">🧘</span>
//             Practices
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;