import React, { useEffect } from 'react'
import { Button, Heading } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { emptyCart } from '../redux/cartSlice';

const PaymentSuccess = ({ updateCartLen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  useEffect(() => {
    localStorage.removeItem("cart");
    dispatch(emptyCart());
    updateCartLen();
    const timeout = setTimeout(() => {
      navigate(`/order/${orderId}`);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [])

  return (
    <div className='flex flex-col min-h-[65vh] gap-10 justify-center items-center'>
      <Heading> Payment Done</Heading>
      <Button
        handleSubmit={() => { navigate("/profile/orders") }}
        title="My Orders"
      />
    </div>
  )
}

export default PaymentSuccess
