import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { DashBoard, Footer, Home, Navbar } from './components'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useContext } from 'react';
import { AuthContext } from './Context/userContext';
import OrderDetail from './pages/OrderDetail';



function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='min-h-[82vh] flex justify-center items-center'>
        <Routes>
          {user ? <Route path='/' element={<Navigate to="/dashboard" replace />} /> : <Route path='/' element={<Home />} />}
          <Route exact path='/dashboard' element={<DashBoard />} />
          <Route path='/dashboard/products/new' element={<DashBoard />} />
          <Route path='/dashboard/products' element={<DashBoard />} />
          <Route path='/dashboard/reviews' element={<DashBoard />} />
          <Route path='/dashboard/orders' element={<DashBoard />} />
          <Route path='/order/:id' element={<OrderDetail />} />
          <Route path='/dashboard/blogs' element={<DashBoard />} />
          <Route path='/dashboard/users' element={<DashBoard />} />
          <Route path='/dashboard/early' element={<DashBoard />} />
          <Route path='/dashboard/blog/new' element={<DashBoard />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
