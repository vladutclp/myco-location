import type { ReactNode } from "react";
import styles from "./ToastMessage.module.css";
interface Props {
  onAnimationEnd: () => void;
  isToastExiting: boolean;
  children: ReactNode;
}

const ToastMessage = ({ children, isToastExiting, onAnimationEnd }: Props) => {
  return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={[styles.toast, isToastExiting && styles.exit]
        .filter(Boolean)
        .join(" ")}
      role="status"
    >
      {children}
    </div>
  );
};

export default ToastMessage;
