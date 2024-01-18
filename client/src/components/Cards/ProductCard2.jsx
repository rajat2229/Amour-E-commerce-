import React from 'react'
//assets
import styles from '../../style'
import AppDesc from '../Text/AppDesc'
import AppText from '../Text/AppText'
import arrow from "../../assets/Home/arrow.svg"
import { useNavigate } from 'react-router-dom'


const ProductCard2 = ({ className, img, name, price,id }) => {
  const navigate = useNavigate();
  return (
    <div className='group relative overflow-hidden main-hover-card'>
      <div className={`${styles.flexCenter} w-44 h-52 md:h-96 md:w-56 lg:min-h-[540px] lg:min-w-[422px] 2xl:min-w-[480px] 2xl:min-h-[550px] p-2 flex flex-col overflow-hidden bg-background_primary transition-all delay-1000 group-hover:bg-gradient-to-b from-white to-background_primary ${className}`}>
        <div>
          <img className='w-24 md:w-44 lg:w-72' src={img} alt="Kurti" />
        </div>
        <div className='absolute bottom-0 md:bottom-3 w-full px-1 md:px-3 lg:px-10 flex justify-between items-center'>
          <div className='flex md:justify-center md:items-center md:flex-col'>
            <AppText className={"lg:hidden absolute left-2 bottom-1"}>{name}</AppText>
            <AppDesc className={"hidden lg:block absolute left-10 bottom-7"}>{name}</AppDesc>
            {/* <AppText className={"hidden md:block"}>₹{price}</AppText> */}
            <AppText className={"hidden "}>₹{price}</AppText>
          </div>
          <div className='flex gap-1 lg:gap-5'>
            <div onClick={() => { navigate(`/product/${id}`) }} className='h-7 w-7 lg:h-10 lg:w-10 bg-background_secondary rounded-md flex justify-center items-center cursor-pointer'>
              <img src={arrow} alt="cart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard2
