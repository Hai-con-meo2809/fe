  import React, { createContext, useState, useContext, useEffect } from 'react';
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';
  import { useNavigate } from 'react-router-dom';

  const AppContext = createContext();

  export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    // const navigate = useNavigate();

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:7298/api/GetData');
        setProducts(response.data);
        if (response.data.length === 0) {
          window.location.href = "https://localhost:7131/Identity/Account/Login";
        }
        if (token) {
          const decodedToken = jwtDecode(token);
          const expiryTime = decodedToken.exp;
          const currentTimeInSeconds = Math.floor(Date.now() / 1000);
          const remainingTimeInSeconds = expiryTime - currentTimeInSeconds;
          if (remainingTimeInSeconds > 0) {
            setTimeout(() => {
              localStorage.removeItem('token');
              // navigate('/login');
            }, remainingTimeInSeconds * 1000);
          } else {
            localStorage.removeItem('token');
            // navigate('/login');
          }
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
      <AppContext.Provider value={{ products, fetchData }}>
        {children}
      </AppContext.Provider>
    );
  };

  export const useAppContext = () => useContext(AppContext);