import React from 'react'
import "./Button.css"
const BtnText = ({className,children,style}) => {
  return (
    <p className={`am-btnText w-full ${className}`} style={style}>{children}</p>
  )
}

export default BtnText
