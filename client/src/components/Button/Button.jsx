import React from "react";
import BtnText from "./BtnText";
import "./Button.css";
const Button = ({
  className,
  title,
  style,
  textClass,
  textStyle,
  handleSubmit,
  disabled,
  ...otherProps
}) => {
  // animation for scale
  // transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300
  return (
    <div>
      <button
        className={`min-h-[3.5rem] disabled:opacity-60 max-h-14 px-8 bg-background_secondary border border-border_secondary flex justify-center items-center cursor-pointer rounded-xl hover:bg-primary_hover transition-all delay-100 ${className}`}
        style={style}
        {...otherProps}
        onClick={handleSubmit}
        disabled={disabled}
      >
        <BtnText className={textClass} style={textStyle}>
          {title}
        </BtnText>
      </button>
    </div>
  );
};

export default Button;
