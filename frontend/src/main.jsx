import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import Formulario from './components/Form/Formulario.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/formulario",
        element: <Formulario />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginForm />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
