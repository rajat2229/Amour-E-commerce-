import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './Context/userContext'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Provider } from 'react-redux'
import store from './redux/store'
AOS.init({
  offset: 300,
  duration: 1000
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
