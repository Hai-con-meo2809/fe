import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import CustomHeader from './CustomHeader';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import TokenChecker from './TokenChecker';
function AppLayout() {

  return (
    <div>
      <TokenChecker/>
      <CustomHeader  />
      <Outlet  /> {/* This is where the main content will be rendered */}
      {/* <Footer /> */}
    
    </div>
  );
}
export default AppLayout;