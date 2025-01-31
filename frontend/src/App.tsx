import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginContainer from './components/login/LoginContainer.tsx';
import RegisterContainer from './components/register/RegisterContainer.tsx';
import HomeContainer from './components/home/HomeContainer.tsx';
import MyPostsContainer from './components/myposts/MyPostsContainer.tsx';
import Main from './components/Main.tsx';

function App() {

  const router = createBrowserRouter([
    {
      path: '/:id',
      element: <HomeContainer />,
    },
    {
      path: '/',
      element: <Main />
    },
    {
      path: '/login',
      element: <LoginContainer />,
    },
    {
      path: '/register',
      element: <RegisterContainer />,
    },
    {
      path: '/my-posts/:id',
      element: <MyPostsContainer />
    }
  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
