import React from 'react'

const AppText = ({children,style,className,handleClick}) => {
  return (
    <p onClick={handleClick} className={`am-text min-w-[100px] md:max-w-full ${className}`} style={style}>{children}</p>
  )
}

export default AppText
