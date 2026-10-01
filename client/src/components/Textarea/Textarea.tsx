import type { ComponentPropsWithoutRef } from "react";
import inputStyles from "../Input/Input.module.css";
import styles from "./Textarea.module.css";

type Props = Omit<ComponentPropsWithoutRef<"textarea">, "children">;

const Textarea = ({ className, ...props }: Props) => (
  <textarea
    {...props}
    className={[inputStyles.input, styles.textarea, className]
      .filter(Boolean)
      .join(" ")}
  />
);

export default Textarea;
