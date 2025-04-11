// // Layout.jsx
// import React from 'react';
// import Navbar from './Navbar';

// const Layout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <main className="flex-1 bg-gray-50">
//         {children}
//       </main>

//       <footer className="bg-white border-t border-gray-100">
//         <div className="max-w-6xl mx-auto py-4 px-6">
//           <div className="flex justify-center space-x-8">
//             <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 px-4 py-2">
//               <Home className="w-6 h-6 mb-1" />
//               <span className="text-sm">Home</span>
//             </button>
//             <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 px-4 py-2">
//               <Compass className="w-6 h-6 mb-1" />
//               <span className="text-sm">Discover</span>
//             </button>
//             <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 px-4 py-2">
//               <User className="w-6 h-6 mb-1" />
//               <span className="text-sm">Profile</span>
//             </button>
//           </div>
          
//           <div className="mt-4 text-center text-sm text-gray-500">
//             © 2024 SereneMind. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Layout;
// Layout.jsx
import React from 'react';
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
     <main className="flex-1 bg-gray-50">
        {children}
      </main>
  
      
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto py-4 px-6">
          <div className="flex justify-center space-x-8">
            <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 px-4 py-2">
          
              <span className="text-sm">Home</span>
            </button>
            <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 px-4 py-2">
             
              <span className="text-sm">Discover</span>
            </button>
            <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 px-4 py-2">
            
              <span className="text-sm">Profile</span>
            </button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            © 2024 SereneMind. All rights reserved.
          </div>
        </div>
      </footer> 
    </div>
  );
};

export default Layout;
