import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Blog from './Blog'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Analytics } from '@vercel/analytics/react' ;
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "blog/:slug",
    element: <Blog />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Analytics />
  </React.StrictMode>
);
