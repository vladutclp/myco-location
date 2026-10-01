import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./Label.module.css";

interface Props extends ComponentPropsWithoutRef<"label"> {
  children: ReactNode;
}

const Label = ({ children, className, ...props }: Props) => {
  return (
    <label
      {...props}
      className={[styles.label, className].filter(Boolean).join("")}
    >
      {children}
    </label>
  );
};

export default Label;
