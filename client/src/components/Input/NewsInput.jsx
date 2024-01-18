import React from 'react'
import {BsArrowRight} from "react-icons/bs"

const NewsInput = ({value,handleSubmit,handleChange,...otherProps}) => {
  return (
    <div 
    className='bg-white flex flex-row justify-between items-center py-3 pl-5 pr-3 md:py-5 md:pl-8 md:pr-6 lg:w-5/12 rounded-xl  w-10/12 md:w-7/12'
    >
      <input 
      type="email" 
      placeholder='Subscribe to Newsletter' 
      className='outline-none font-primary_font placeholder:text-primary text-primary text-md lg:text-xl font-semibold w-10/12' 
      value={value} 
      onChange={handleChange}
      {...otherProps}
      />
      <BsArrowRight onClick={handleSubmit} className="cursor-pointer" size={20} color="var(--primary-color)"/>
    </div>
  )
}

export default NewsInput
