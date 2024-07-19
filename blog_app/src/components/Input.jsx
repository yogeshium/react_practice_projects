import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div>
        {label && (
          <label className="" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={`${className}`}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
