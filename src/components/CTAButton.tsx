"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";

type CTAButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  /** きらめくシャイン演出 */
  shine?: boolean;
};

const MotionLink = motion.create(Link);

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
  onClick,
  disabled,
  shine = true,
}: CTAButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size }),
    "relative overflow-hidden",
    className,
  );

  const shineEl = shine ? (
    <span className="pointer-events-none absolute inset-0 shine animate-[shimmer_2.4s_linear_infinite] opacity-70" />
  ) : null;

  const anim = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
  };

  if (href && !disabled) {
    return (
      <MotionLink href={href} className={classes} onClick={onClick} {...anim}>
        {shineEl}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...anim}
    >
      {shineEl}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
