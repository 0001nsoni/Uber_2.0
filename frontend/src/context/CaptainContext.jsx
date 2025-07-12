import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const CaptainDataContext = createContext();

// Provider component
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // start with true to show loader
  const [error, setError] = useState(null);

  // Fetch profile if token exists in localStorage
  const fetchCaptainProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // if you're using cookies too
      });

      setCaptain(res.data.captain);
    } catch (err) {
      console.error("Error fetching captain profile:", err.message);
      setCaptain(null);
      setError("Failed to fetch captain profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Run once on mount
  useEffect(() => {
    fetchCaptainProfile();
  }, []);

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain: (captainData) => setCaptain(captainData),
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
