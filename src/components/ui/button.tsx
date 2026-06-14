import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple/30 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-gradient text-white shadow-[var(--shadow-glow-pink)] hover:shadow-[var(--shadow-glow-purple)] hover:brightness-[1.04]",
        secondary:
          "glass-strong text-ink hover:bg-white/10 border border-white/15",
        outline:
          "border-2 border-brand-purple/40 text-ink bg-white/5 hover:bg-white/10",
        ghost: "text-ink hover:bg-white/5",
        gold: "text-[#5b4406] shadow-[0_10px_30px_-10px_rgba(245,196,81,0.8)] hover:brightness-105 bg-[linear-gradient(100deg,#ffe08a,#f5c451)]",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
