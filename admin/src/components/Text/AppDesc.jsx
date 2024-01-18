import React from 'react'

const AppDesc = ({children,style,className,handleClick}) => {
  return (
    <p onClick={handleClick} className={`text-md text-primary font-secondary_font text-center md:text-2xl ${className}`} style={style}>{children}</p>
  )
}

export default AppDesc
