import React from 'react'
import "./text.css"
const Heading = ({children,style,className}) => {
  return (
    <h1 className={`text-4xl font-bold text-primary font-primary_font text-center md:text-6xl 2xl:text-7xl ${className}`} style={style}>{children}</h1>
  )
}

export default Heading
