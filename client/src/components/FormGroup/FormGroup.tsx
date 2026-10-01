import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./FormGroup.module.css";

interface Props extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

const FormGroup = ({ children, className, ...rest }: Props) => {
  return (
    <div
      {...rest}
      className={[styles.formGroup, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
};

export default FormGroup;
