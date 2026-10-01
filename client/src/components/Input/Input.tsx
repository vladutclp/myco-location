import { type ComponentPropsWithoutRef } from "react";
import styles from "./Input.module.css";

type Props = Omit<ComponentPropsWithoutRef<"input">, "children">;

const Input = ({ className, ...rest }: Props) => {
  return (
    <input
      {...rest}
      className={[styles.input, className].filter(Boolean).join(" ")}
    />
  );
};

export default Input;
