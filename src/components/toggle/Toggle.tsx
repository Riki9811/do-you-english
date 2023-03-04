import styles from "./Toggle.module.scss";

interface ToggleProps {
	active: boolean;
	setActive: React.Dispatch<boolean>;
}

export default function Toggle({ active, setActive }: ToggleProps) {
	return <span className={`${styles.toggle} ${active ? styles.active : ""}`} onClick={() => setActive(!active)}></span>;
}
