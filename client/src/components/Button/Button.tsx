import type { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.css";

interface Props extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "quiet" | "destructive";
}

const Button = ({ children, className, variant = "primary", ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={[styles.button, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
