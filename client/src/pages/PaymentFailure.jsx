import React, { useEffect } from 'react'
import { Button, Heading } from '../components'
import { useNavigate } from 'react-router-dom'

const PaymentFailure = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const timeout = setTimeout(() => {
      navigate(`/checkout`);
    }, 2000);
    return ()=>clearTimeout(timeout);
  },[])
  return (
    <div className='flex flex-col min-h-[65vh] gap-10 justify-center items-center'>
      <Heading> Payment Not Successful</Heading>
      <Button
        handleSubmit={() => { navigate("/checkout",{replace:true}) }}
        title="Checkout"
      />
    </div>
  )
}

export default PaymentFailure
