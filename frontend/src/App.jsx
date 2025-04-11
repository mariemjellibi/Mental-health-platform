// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
// import ProtectedRoute from './router/ProtectedRoute';
// import { AuthProvider } from './context/AuthContext';
// import Userpage from './pages/User/Userpage';
// import MeditationPage from './components/Meditation/MeditationPage';
// import MeditationHome from './components/Meditation/MeditationHome';
// import ChatComponent from './components/ChatComponent';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Route for Userpage */}
//           <Route
//             path="/userpage"
//             element={
//               <ProtectedRoute>
//                 <Userpage />
//               </ProtectedRoute>
//             }
//           />
//           <Route path='/userpage/meditation' element={<MeditationHome />} />

//        <Route path='/userpage/chat' element={<ChatComponent />} />

//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './router/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Userpage from './pages/User/Userpage';
// import MeditationPage from './components/Meditation/MeditationPage';
import MeditationHome from './components/Meditation/MeditationHome';
import ChatComponent from './components/ChatComponent';
import JournalPage from './components/Journaling/JournalPage';
import UserHome from './pages/User/UserHome';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/userpage/"
            element={
              <ProtectedRoute>
                <Userpage />
              </ProtectedRoute>
            }
          >
              <Route index element={<UserHome/>} />
  <Route path="meditation" element={<MeditationHome />} />
  <Route path="chat" element={<ChatComponent />} />
  <Route path="journal" element={<JournalPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

