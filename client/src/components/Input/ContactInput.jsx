import React from 'react'

const ContactInput = ({placeholder,value,type,handleChange,...otherProps}) => {
  return (
    <input 
    className='bg-inherit border-b w-full py-3 my-5 placeholder:text-primary text-primary font-primary_font text-lg outline-none border-black'
    type={type || "text"}
    value={value}
    placeholder={placeholder}
    onChange={handleChange}
      {...otherProps}
    />
  )
}

export default ContactInput
