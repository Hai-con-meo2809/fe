// TokenChecker.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const TokenChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
      const decodedToken = jwtDecode(token);
      const expiryTime = decodedToken.exp;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const remainingTimeInSeconds = expiryTime - currentTimeInSeconds;

      if (remainingTimeInSeconds > 0) {
        setTimeout(() => {
          localStorage.removeItem('token');
          // setIsAuthenticated(false);
          navigate('/login');
        }, remainingTimeInSeconds * 1000); // Chuyển thời gian còn lại sang milliseconds cho setTimeout
      } else {
        localStorage.removeItem('token');
        // setIsAuthenticated(false);
        // window.location.href = "https://localhost:7131/Identity/Account/Login";
      }
    }
  }, [navigate]);

  return null; // Không cần render gì cả
};

export default TokenChecker;
