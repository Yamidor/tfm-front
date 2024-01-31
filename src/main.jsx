import React from 'react'
import ReactDOM from 'react-dom'
import { RouterProvider} from "react-router-dom";
import App from './App.jsx'
import Router from './routes/Ruotes.jsx'
import './index.css'


ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={Router}/>
  </React.StrictMode>,
  document.getElementById('root')
);