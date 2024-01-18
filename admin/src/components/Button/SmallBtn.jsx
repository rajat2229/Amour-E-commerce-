import React from 'react'
import "./Button.css"
import SmallBtnText from './SmallBtnText'
const SmallBtn = ({ className, title, style, textClass, textStyle, ...otherProps }) => {
  // animation for scale 
  // transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300
  return (
    <div>
      <button className={`min-h-[2rem] px-8 bg-background_secondary border border-border_secondary flex justify-center items-center cursor-pointer rounded-xl ${className}`}
        style={style}
        {...otherProps}
        onClick={() => console.log("clicked")
        }
      >
        <SmallBtnText className={textClass} style={textStyle}>{title}</SmallBtnText>
      </button>
    </div>
  )
}

export default SmallBtn
