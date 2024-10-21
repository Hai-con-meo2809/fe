import React from 'react';
import AppRoutes from './routes/AppRoutes'; 
import 'plyr/dist/plyr.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function App() {
  // const location = useLocation();

  return (
    <AppRoutes  />
  );
}

export default App;

