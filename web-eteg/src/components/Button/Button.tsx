import React from "react";
import "./Button.style.css";
import { ISizes, sizes } from "./sizes";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  size?: ISizes;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  className,
  size = "medium",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        className={`button-custom ${sizes[size]} ${className}`}
        type={type}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
