import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import styles from "./FormGroup.module.css";

interface Props extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

const FormGroup = ({ children, ...rest }: Props) => {
  return (
    <div {...rest} className={styles.formGroup}>
      {children}
    </div>
  );
};

export default FormGroup;
