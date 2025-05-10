import { forwardRef } from "react";

import LoadingIcon from "@/icons/LoadingIcon";
import { cn } from "@/utils/common.utils";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium 
  disabled:pointer-events-none disabled:bg-primary80 disabled:text-primary40  
  shadow-primary-3 transition duration-150 ease-in-out 
  hover:bg-primary-accent-300 hover:shadow-primary-2 
  focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 
  active:bg-primary-600 active:shadow-primary-2 `,
  {
    variants: {
      variant: {
        default: `bg-primary text-secondary hover:bg-primary/90 disabled:bg-primary80 `,
        destructive: `bg-destructive text-destructive-foreground hover:bg-destructive/90`,
        outline: `border border-input bg-background hover:bg-accent hover:text-accent-foreground`,
        secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80`,
        ghost: `hover:bg-accent hover:text-accent-foreground`,
        link: `text-primary underline-offset-4 hover:underline`,
      },
      size: {
        default: `h-10 px-4 py-2`,
        sm: `h-9 rounded-xl px-3`,
        lg: `h-12 rounded-xl px-8`,
        icon: `h-10 w-10`,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { loading?: boolean };

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      variant,
      size,
      className,
      disabled,
      loading = false,
      children,
      ...restProps
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        ref={ref}
        {...restProps}
      >
        {loading ? (
          <LoadingIcon className="disabled animate-spin bg-primary" size={20} />
        ) : (
          children
        )}
      </button>
    );
  },
);

PrimaryButton.displayName = "PrimaryButton";
