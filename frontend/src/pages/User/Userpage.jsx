// // Userpage.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for routing
// import Layout from '../../components/Layout.jsx';
// import MeditationHome from '../../components/Meditation/MeditationHome.jsx';
// import MeditationPage from '../../components/Meditation/MeditationPage.jsx'; // Import other components you need
//  // Assuming you want a content for the user page

// const Userpage = () => {
//   return (
//     <Layout>
//       <Routes>
//          {/* Default User Page */}
//         <Route path="/userpage/meditation/mindfulness" element={<MeditationPage />} /> {/* Meditation Page (Mindfulness) */}
//         <Route path="/userpage/meditation/anxiety" element={<MeditationPage />} /> {/* Meditation Page (Anxiety) */}
//         <Route path="/userpage/meditation" element={<MeditationHome />} /> Default route
//       </Routes>
//     </Layout>
//   );
// };

// export default Userpage;






// Userpage.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../../components/Layout';
const Userpage = () => {
  return (
   <Layout>
      {/* This will render the nested routes */}
     {/* <UserRoutes /> This will render the UserRoutes component */}
     <Outlet />
  
    </Layout>
  );
};

export default Userpage;

