import React from "react";

interface MinusProps {
  size?: number;
  className?: string;
}

export const Minus: React.FC<MinusProps> = ({ size = 24, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-minus ${className}`}
    >
      <path d="M5 12h14" />
    </svg>
  );
};
