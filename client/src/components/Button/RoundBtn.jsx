import React from 'react'
import "./Button.css"
import {HiArrowRight,HiArrowLeft} from "react-icons/hi"

const RoundBtn = ({className, title, style, textClass, textStyle,right,left,onClick,disabled, ...otherProps }) => {
  // animation for scale 
  // transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300
  return (
    <div>
      <button className={`min-h-[3.5rem] max-h-14 w-14 bg-background_secondary border border-border_secondary flex justify-center items-center cursor-pointer rounded-full hover:bg-primary_hover transition-all delay-100 ${className}`}
        style={style}
        onClick={onClick}
        {...otherProps}
      >
        {/* <BtnText className={textClass} style={textStyle}>{title}</BtnText> */}
        {right && <HiArrowRight color='white'/>}
        {left && <HiArrowLeft color='white'/>}
      </button>
    </div>
  )
}

export default RoundBtn
