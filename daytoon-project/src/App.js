import React from 'react';

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from './pages/Home';
import Search from './components/Search';
import Admin from './components/Admin';

import './App.css';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
            children: [
                { index: true, element: <Search /> },
                { path: '/admin', element: <Admin />}
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;