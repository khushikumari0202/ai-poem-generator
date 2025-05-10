import { Option } from "@/types/types";
import { StylesConfig } from "react-select";

export const colourStyles: StylesConfig<Option> = {
  clearIndicator: (base) => ({
    ...base,
    color: "red",
  }),
  control: (styles, { menuIsOpen }) => ({
    ...styles,
    cursor: "pointer",
    backgroundColor: "transparent",
    border: menuIsOpen ? "1px solid #ba5b3866" : "1px solid #706b5740",
    boxShadow: menuIsOpen ? "0 0 0 1px #ba5b3866" : "none", // Optional: adds a glow effect
    "&:hover": {
      border: menuIsOpen ? "1px solid #ba5b3866" : "1px solid #706b5740",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      margin: 0,
      color: isSelected ? "#000000" : isFocused ? "#000" : "#333333",
      background: isFocused ? "#ba5b3866" : "#E6E4DB",
      ":active": {
        color: "#000",
        backgroundColor: !isDisabled
          ? isSelected
            ? "#F0EEE5"
            : "#F0EEE5"
          : undefined,
      },
    };
  },
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#E6E4DB",
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "start",
    height: "25px",
  }),
};
