import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import Header from './components/Header.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Header />
    <br/>
    <br />
    <App />
  </React.StrictMode>,
)