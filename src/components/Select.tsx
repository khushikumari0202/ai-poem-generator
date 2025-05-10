// @/components/ui/select.tsx
import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  className,
  ...props
}) => {
  return (
    <select
      className={`bg-purple-500 text-white placeholder-purple-200 w-full rounded-md p-2 ${className}`}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`bg-white text-purple-600 hover:bg-purple-100 rounded-md px-4 py-2 font-bold transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
