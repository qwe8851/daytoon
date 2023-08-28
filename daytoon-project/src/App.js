import React from 'react';

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from './pages/Home';
import Search from './components/Search';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Admin from './components/Admin';

import './App.css';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
            children: [
                { index: true, element: <Search /> },
                { path: '/admin', element: <Admin /> },
                { path: '/admin/signin', element: <Signin /> },
                { path: '/admin/signup', element: <Signup /> },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;