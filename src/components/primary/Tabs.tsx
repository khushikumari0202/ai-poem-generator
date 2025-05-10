import React, { createContext, ReactNode, useContext, useState } from "react";

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  value,
  defaultValue,
  onValueChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange(newValue);
  };

  return (
    <TabsContext.Provider
      value={{ value: currentValue, onValueChange: handleValueChange }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return (
    <div className={`flex w-fit md:space-x-2   ${className}`}>{children}</div>
  );
};

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
  isBordered?: boolean;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  children,
  value,
  isBordered = false,
  className,
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }
  const { value: selectedValue, onValueChange } = context;
  const isActive = value === selectedValue;

  return (
    <button
      className={`
        flex w-fit items-center justify-center rounded-full px-3 py-2 transition-colors duration-200 md:px-4 md:py-2
        ${
          isActive
            ? `bg-primary text-primary-foreground shadow-md hover:bg-accent ${isBordered && "border"} border-primary`
            : `text-white bg-none hover:bg-secondary hover:text-primary-foreground ${isBordered && "border"} border-border`
        } 
        ${className}
      `}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  children,
  value,
  className,
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }
  const { value: selectedValue } = context;

  if (value !== selectedValue) {
    return null;
  }

  return (
    <div className={`border-t border-border pt-5 ${className}`}>{children}</div>
  );
};
