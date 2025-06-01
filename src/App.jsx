import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Loginpage from './components/pages/Loginpage';
import Description from './components/pages/Cardpage/Description';
import HomePage from './components/pages/Homepage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <React.Suspense fallback={"loading......"}>
        <HomePage />
      </React.Suspense>
    },
    {
      path: '/product/:id',
      element: <Description />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;