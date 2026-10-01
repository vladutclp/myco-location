import type { ComponentPropsWithoutRef } from "react";
import styles from "./PaperPanel.module.css";

type Props = ComponentPropsWithoutRef<"div">;

const PaperPanel = ({ className, ...props }: Props) => (
  <div
    {...props}
    className={[styles.panel, className].filter(Boolean).join(" ")}
  />
);

export default PaperPanel;
