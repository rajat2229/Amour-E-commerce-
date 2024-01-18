import React from 'react'

//assets
import Suit1 from '../../assets/Home/suit1.png'
import styles from '../../style'


const ProductCard3 = (props) => {
  return (
    <div className={`${styles.flexCenter} w-24 h-28 p-2 bg-background_primary overflow-hidden md:mx-3 lg:mx-0 md:h-44 md:w-28 lg:h-44 lg:w-248 rounded-3xl`}>
      <img className='w-16 lg:w-24' src={props.img || Suit1} alt="Kurti" />
    </div>
  )
}

export default ProductCard3
