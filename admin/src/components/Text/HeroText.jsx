import React from 'react'
import "./text.css"
const HeroText = ({children,style}) => {
  return (
    <h1 className='text-5xl font-bold text-primary font-primary_font text-center lg:text-left md:text-8xl 2xl:text-9xl' style={style}>{children}</h1>
  )
}

export default HeroText
