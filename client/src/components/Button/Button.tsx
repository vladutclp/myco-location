import { type ReactNode, type ComponentPropsWithoutRef } from "react";
import styles from "./Buton.module.css";

interface Props extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

const Button = ({ children, className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={[styles.button, className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
