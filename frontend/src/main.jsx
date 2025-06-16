import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import OffersPage from '@/pages/OffersPage';
import AboutPage from '@/pages/AboutPage';
import VideosPage from '@/pages/VideosPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';
import '@/index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/offers",
    element: <OffersPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/videos",
    element: <VideosPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
