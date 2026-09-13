import type { ReactNode } from "react";
interface Props {
  onAnimationEnd: () => void;
  isToastExiting: boolean;
  children: ReactNode;
}

const ToastMessage = ({ children, isToastExiting, onAnimationEnd }: Props) => {
  return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={`toast ${isToastExiting ? "toast--exit" : ""}`}
      role="status"
    >
      {children}
    </div>
  );
};

export default ToastMessage;
