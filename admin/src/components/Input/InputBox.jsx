import React from "react";

const InputBox = ({ placeholder, className,handleChange,handleFocus,handleBlur, type,...otherProps }) => {
  return (
    <input
      type={type || "text"}
      className={`p-5 w-full text-base outline-none border-border_primary border text-primary placeholder:text-primary placeholder:opacity-80 ${className}`}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      {...otherProps}
    />
  );
};

export default InputBox;
