import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = React.InputHTMLAttributes<HTMLInputElement> & {};

const CustomInput = ({ ...otherProps }: Props) => {
  return (
    <input
      style={{ height: 40, fontSize: 20, padding: "0 10px 0 10px" }}
      {...otherProps}
    />
  );
};

export default CustomInput;
