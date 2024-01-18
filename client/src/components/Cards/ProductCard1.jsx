import React from 'react'

//assets
import styles from '../../style'
import { useNavigate } from 'react-router-dom'


const ProductCard1 = ({img,id}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => { navigate(`/product/${id}`) }} className={`${styles.flexCenter} w-24 h-28 p-2 bg-background_primary overflow-hidden md:mx-3 lg:mx-0 md:h-52 md:w-36 lg:h-72 lg:w-48 2xl:w-56 cursor-pointer`}>
      <img className='w-16 md:w-24 lg:w-40' src={img} alt="Kurti" />
    </div>
  )
}

export default ProductCard1
