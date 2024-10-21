import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import Login from '../Component/Login';
import Cart from '../Component/Cart';
import PrivateRoute from '../Component/PrivateRoute';
import Register from '../Component/Register';
import CourseContent from '../Component/CourseContent';
import Body from '../Component/Body';
import Footer from '../Component/Footer';
import RandomDogImage from '../Component/RandomDogImage';
import SignalRService from '../Component/SignalRService';
import { AppProvider } from '../Component/AppContext';
import AppLayout from '../Component/AppLayout';
import TokenChecker from '../Component/TokenChecker';
import CourseDetail from '../Component/CourseDetail';
import CustomHeader from '../Component/CustomHeader';
import LearningPage from '../Component/LearningPage';
import CourseLayout from '../Component/CourseLayout';
import VideoPlayer from '../Component/VideoPlayer';
import CourseListByTeaching from '../Component/CourseListByTeaching';
import InstructorProfile from '../Component/InstructorProfile';
import ProfileSettings from '../Component/ProfileSettings';
import CourseProgram from '../Component/CourseProgram';
import MessagePage from '../Component/MessagePage';
import Chat from '../Component/Chat';

const router = () => createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Body /> },
      { path: "/", element: <Body /> },
      { path: "cart", element: <Cart /> },
      { path: "setting", element: <ProfileSettings /> },
      { path: "teachingcourse", element: <CourseListByTeaching /> },
      { path: "course", element: <CourseDetail /> },
      { path: "study", element: <LearningPage /> },
      { path: "courseProgram", element: <CourseProgram /> },
      { path: "/message", element: <MessagePage /> },
      {
        element: <PrivateRoute />,
        children: [
          // Private routes go here
          // { path: "checkout", element: <ProductDetail /> },
          { path: "/test", element: <RandomDogImage /> },
          { path: "/you", element: <CourseLayout /> },


        ]
      }
    ]
  },

  { path: "/chat", element: <Chat/> },
  { path: "/coursecontent", element: <CourseContent /> },
  { path: "/you", element: <CourseLayout /> },
  { path: "/test", element: <RandomDogImage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> }
  
]);

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));



  return (
    <AppProvider>
      <RouterProvider router={router(isAuthenticated)} />
    </AppProvider>
  );
}

export default AppRoutes;