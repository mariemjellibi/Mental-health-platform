import API from "../services/api";
export const registerUser= async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    const token = response.data.token; // Ensure the token is returned from the server

    // Store the token in localStorage (or cookies)
    localStorage.setItem('TOKEN', token);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Registration failed");
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Login failed");
  } 
};
export const getCurrentUser = async () => { 
    try {
        const response = await API.get("/auth/currentuser");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to fetch current user");
    }
    }