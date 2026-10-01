import { type ComponentPropsWithoutRef } from "react";
import styles from "./Input.module.css";

interface Props extends ComponentPropsWithoutRef<"input"> {}

const Input = ({ children, className, ...rest }: Props) => {
  return (
    <input
      {...rest}
      className={[styles.input, className].filter(Boolean).join(" ")}
    />
  );
};

export default Input;
