import { cn } from "@/utils/common.utils";
import React from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

export type PrimaryInputProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    title?: string;
    defaultValue?: string;
    description?: string;
    error?: string;
    name: string;
    registerOptions?: RegisterOptions<FieldValues, string>;
  };

const PrimaryInput = React.forwardRef<HTMLTextAreaElement, PrimaryInputProps>(
  (
    {
      title,
      defaultValue,
      description,
      name,
      registerOptions,
      className,
      ...restProps
    },
    ref,
  ) => {
    const id = React.useId();
    const { register, formState } = useFormContext() || {};
    const elementRegistration =
      register?.(name, { ...registerOptions, value: defaultValue }) || {};

    const { errors } = formState || {};

    return (
      <div className="flex flex-col gap-2">
        {title && <label htmlFor={id}>{title}</label>}
        <textarea
          id={id}
          className={cn(
            "flex w-full rounded-md border border-border bg-background px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground  focus-visible:border-[#ba5b3866] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ba5b3866] disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...restProps}
          {...elementRegistration}
          {...(ref ? { ref } : {})}
        />
        {description && <span className="mt-1 text-xs">{description}</span>}
        {/* {errorMessage && (
          <span className="mt-1 text-xs text-destructive">{errorMessage}</span>
        )} */}
      </div>
    );
  },
);

PrimaryInput.displayName = "PrimaryInput";

export { PrimaryInput };
