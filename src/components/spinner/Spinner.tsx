import styles from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["loading-spinner"]}></div>
    </div>
  );
}