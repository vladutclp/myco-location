import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Icon.module.css";

type IconName = "leaf" | "pin" | "plus" | "locate" | "trash" | "notebook" | "compass";
type Props = ComponentPropsWithoutRef<"svg"> & { name: IconName };

const paths: Record<IconName, ReactNode> = {
  leaf: <><path d="M20 4c0 9-4 15-10 15a6 6 0 0 1-6-6C4 7 11 4 20 4Z" /><path d="m4 20 11-11" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  locate: <><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3" /></>,
  trash: <><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" /></>,
  notebook: <><rect x="6" y="3" width="14" height="18" rx="2" /><path d="M3 7h5M3 12h5M3 17h5M11 8h5m-5 4h5" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z" /></>,
};

const Icon = ({ name, className, "aria-hidden": ariaHidden = true, ...props }: Props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={ariaHidden}
    focusable="false"
    {...props}
    className={[styles.icon, className].filter(Boolean).join(" ")}
  >
    {paths[name]}
  </svg>
);

export default Icon;
