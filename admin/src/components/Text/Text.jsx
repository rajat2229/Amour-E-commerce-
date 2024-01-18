import React from 'react'

const Text = ({className,style,children}) => {
  return (
    <p className={`text-lg text-primary font-bold font-primary_font text-center md:text-xl ${className}`} style={style}>{children}</p>
  )
}

export default Text
