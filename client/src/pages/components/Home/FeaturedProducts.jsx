import React, { useEffect, useState } from 'react'
import { AppDesc, Heading, LoadingOverlay, RoundBtn } from '../../../components'
import { recommndedProducts } from '../../../http/product'
import { useNavigate } from 'react-router-dom'

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  function handleRightClick() {
    if (count < 5) setCount(prevState => prevState + 1);
    else (setCount(0));
  }
  function handleLeftClick() {
    if (count > 0) setCount(prevState => prevState - 1);
    else setCount(5);
  }


  const [recommndedProd, setRecommendedProd] = useState(null);
  async function fetchRecommeded() {
    const value = await recommndedProducts();
    setRecommendedProd(value.products);
  }
  useEffect(() => {
    const timer = setInterval(() => {
      if (count < 5) {
        setCount(prevState => prevState + 1);
      } else {
        setCount(0);
      }
    }, 2500);
    return () => clearInterval(timer);
  });
  useEffect(() => {
    fetchRecommeded();
  }, [])

  if (!recommndedProd || recommndedProd === null) return <LoadingOverlay />
  return (
    <div className='min-h-[10vh] bg-background_primary  lg:px-16 relative' >
      <div className='p-5'>
        <div className='lg:absolute lg:top-20'>
          <Heading>Our Bestseller</Heading>
          <div className='lg:flex lg:justify-start ml-2'>
            <AppDesc>The most loved amour collection</AppDesc>
          </div>
          <div className='flex justify-center lg:justify-around  items-center gap-10 mt-4'>
            <RoundBtn
              onClick={handleLeftClick}
              left={true}
            />
            <RoundBtn
              onClick={handleRightClick}
              right={true}
            />
          </div>
        </div>
        <div className='mt-3 lg:mt-10'>
          <div className='flex justify-end items-center'>
            <div className='w-32 h-36 md:h-52 md:w-48 lg:h-72 lg:w-56 bg-white rounded-t-full flex justify-center items-center'>
              <img src={count !== 5 ? recommndedProd[count + 1]?.images[0] : recommndedProd[0]?.images[0]} alt="suit image" className='h-28 w-20 md:h-48 md:w-28 lg:w-40 lg:h-48 object-contain' />
            </div>
          </div>
          <div className='flex flex-col justify-center items-center mt-8 lg:mt-0 z-10'>
            <div onClick={() => {
              navigate(`/product/${recommndedProd[count]?._id}`)
            }} className='bg-background_secondary relative w-48 h-52 md:h-64 md:w-64 z-10 lg:h-96 lg:w-96 rounded-t-full flex justify-center items-center before:absolute before:rounded-t-full before:h-52 before:w-48 before:top-0 before:left-0 before:md:h-64 before:md:w-64 before:lg:h-96 before:lg:w-96 before:bg-white before:-z-10 hover:before:rotate-6 before:transition-all before:duration-700 cursor-pointer'>
              <img src={recommndedProd[count]?.images[0]} alt="suit image" className='h-44 w-28 md:h-48 md:w-40 lg:w-64 lg:h-72 object-contain  rounded-2xl' />
            </div>
            <div className='flex flex-col justify-self-center justify-center items-center'>
              <AppDesc>{" "} {recommndedProd[count]?.name} </AppDesc>
              <AppDesc>{" "} ₹{recommndedProd[count]?.price}</AppDesc>
            </div>
          </div>
          <div className='flex justify-start items-center mt-10 lg:mt-0'>
            <div className='w-32 h-36 md:h-52 md:w-48 lg:h-72 lg:w-56 bg-white rounded-t-full flex justify-center items-center'>
              <img src={count !== 0 ? recommndedProd[count - 1]?.images[0] : recommndedProd[5]?.images[0]} alt="suit image" className='h-28 w-20 md:h-48 md:w-28 lg:w-40 lg:h-48 object-contain' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
