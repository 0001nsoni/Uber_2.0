import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const { captain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !captain) {
      navigate('/captain-login');
    }
  }, [token, captain, navigate]);

  // Optional: Prevent flicker
  if (!token || !captain) return null;

  return <>{children}</>;
};

export default CaptainProtectWrapper;