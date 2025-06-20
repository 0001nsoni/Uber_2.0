import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // No token? Already logged out.
      navigate('/captain-login');
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/captain/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      })
      .catch((err) => {
        console.error('Logout failed:', err);
        localStorage.removeItem('token'); // Clear token anyway
        navigate('/captain-login');
      });
  }, [navigate]);

  return (
    <div className="text-center mt-10 text-lg text-gray-600">
      Logging out...
    </div>
  );
};

export default CaptainLogout;
