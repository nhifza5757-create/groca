import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md";
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const sizeStyles = {
    md: "px-6 py-3 text-sm",
    sm: "px-5 py-1.5 text-sm",
  };

  // "rounded-full" se ab pill-shape button banta hai (jaisa real site mein hai)
  const baseStyles = `${sizeStyles[size]} rounded-full font-medium transition-colors duration-200`;

  // Ab exact groca brand colors use ho rahe hain (globals.css se), generic
  // Tailwind green-600 ki jagah — isse asli site ke shade se match karega.
  // Hover pe primary button ab orange ho jata hai.
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-orange-600",
    outline:
      "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-surface)]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}