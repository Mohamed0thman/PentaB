import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  handleOnClick?: () => void;
};
const CustomButton = ({ text, handleOnClick, ...otherProps }: Props) => {
  return (
    <button className="button" onClick={handleOnClick} {...otherProps}>
      {text}
    </button>
  );
};

export default CustomButton;
