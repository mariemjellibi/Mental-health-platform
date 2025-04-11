import { createContext,useContext,useEffect,useState } from "react";
import { getCurrentUser } from "../context/authService"
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    const fetchUser = async () => {
      const data = await getCurrentUser();
      if (data) setUser(data);
    };
  
    useEffect(() => {
      fetchUser();
    }, []);
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);