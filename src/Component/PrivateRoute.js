import React, { useState,useEffect,useRef } from 'react';
import { Card } from 'react-bootstrap';
import { Navigate, Outlet,useLocation } from 'react-router-dom';
import Cart from './Cart';
import RandomDogImage from './RandomDogImage';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  
  const location = useLocation();
useEffect(() =>{
  const gettoken = !!localStorage.getItem('token');
  console.log('hello');
  setIsAuthenticated(gettoken);
},[]);
  return isAuthenticated ? <Outlet/>  : <Navigate to="/login" state={{from:location}}/>;
};

export default PrivateRoute;
