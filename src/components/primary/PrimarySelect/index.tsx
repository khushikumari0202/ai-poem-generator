import { Option } from "@/types/types";
import React from "react";
import Select, { Props as SelectProps } from "react-select";
import { colourStyles } from "./react_select.styleConfig";

export type PrimaryDropDownProps = SelectProps<Option> & {
  label?: string;
  className?: string;
};

const PrimarySelect = ({
  label,
  className,
  ...restProps
}: PrimaryDropDownProps) => {
  const id = React.useId();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <Select
        isSearchable={false}
        isLoading={false}
        blurInputOnSelect={true}
        theme={(theme) => ({
          ...theme,
          borderRadius: 8,
          colors: {
            ...theme.colors,
          },
        })}
        styles={colourStyles}
        hideSelectedOptions={true}
        isClearable={false}
        className="basic-single "
        classNamePrefix="select"
        {...restProps}
      />
      {/* {errorMessage && (
          <span className="mt-1 text-xs text-destructive">{errorMessage}</span>
        )} */}
    </div>
  );
};

PrimarySelect.displayName = "PrimarySelect";

export { PrimarySelect };
