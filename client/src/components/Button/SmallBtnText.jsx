import React from 'react'
import "./Button.css"
const SmallBtnText = ({className,children,style}) => {
  return (
    <p className={`text-xs text-white font-secondary_font md:text-lg w-full ${className}`} style={style}>{children}</p>
  )
}

export default SmallBtnText
