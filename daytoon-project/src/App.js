import React from 'react';

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from './pages/Home';
import Search from './components/Search';
import Signin from './components/Signin';
import Signup from './components/Signup';
import BookShelf from './components/BookShelf';
import BookDetail from './components/BookDetail';

import './App.css';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
            children: [
                { index: true, element: <Search /> },
                { path: '/admin/signin', element: <Signin /> },
                { path: '/admin/signup', element: <Signup /> },
                { path: '/admin', element: <BookShelf /> },
                { path: '/admin/detail', element: <BookDetail /> },
                { path: '/admin/detail/:bookid', element: <BookDetail /> },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;