import { HTMLAttributes } from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
    className?: string
}

export default function Spinner({ className: customClass = "" }: SpinnerProps) {
  return (
    <div className={`${customClass} ${styles["spinner-container"]}`}>
      <div className={styles["loading-spinner"]}></div>
    </div>
  );
}