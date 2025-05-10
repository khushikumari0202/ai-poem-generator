import ArrowIcon from "@/icons/ArrowIcon";
import React, { createContext, useContext, useState } from "react";

type AccordionContextType = {
  expandedItem: string | null;
  setExpandedItem: (value: string | null) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

export const Accordion: React.FC<{
  type: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ type, collapsible = false, className, children }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ expandedItem, setExpandedItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<{
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return <div data-value={value}>{children}</div>;
};

export const AccordionTrigger: React.FC<{
  children: React.ReactNode;
  value: string;
}> = ({ children, value }) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionTrigger must be used within an Accordion");

  const { expandedItem, setExpandedItem } = context;

  const handleClick = () => {
    setExpandedItem(expandedItem === value ? null : value);
  };

  return (
    <div
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      className={`group-hover: group group relative flex w-full items-center justify-between border-t border-border  pb-3 hover:border-primary ${expandedItem === value && "w-full border-primary"}`}
    >
      <span
        className={`text-md text-text w-[200px] p-1.5 leading-8  transition-all duration-500 group-hover:text-primary ${expandedItem === value && "text-primary"}`}
      >
        {children}
      </span>
      <div
        className={`absolute left-0 top-0 h-0 w-[200px] transition-all duration-500 group-hover:h-[44px] ${expandedItem === value && "h-[44px]"}`}
      />
      <div
        className={`text-light rotate-90 transition-all  duration-500 group-hover:text-primary ${expandedItem === value && "rotate-[-90deg] text-primary "}`}
      >
        <ArrowIcon />
      </div>
      {/* {expandedItem === value ? " ▼" : " ▶"} */}
    </div>
  );
};

export const AccordionContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  value: string; // Add this prop
}> = ({ children, className, value }) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionContent must be used within an Accordion");

  const { expandedItem } = context;

  if (expandedItem !== value) return null;

  return (
    <div className={`${className} mb-3 rounded-md bg-card p-5 shadow-sm`}>
      {children}
    </div>
  );
};
