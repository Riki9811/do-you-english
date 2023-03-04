import { KeyboardEvent } from "react";
import styles from "./Toggle.module.scss";

interface ToggleProps {
	active: boolean;
	setActive: React.Dispatch<boolean>;
}

export default function Toggle({ active, setActive }: ToggleProps) {
    function handleKeyboard(e: KeyboardEvent) {
        if (e.key === " " || e.key === "Enter") setActive(!active);
    }

	return (
		<span
			tabIndex={0}
			className={`${styles.toggle} ${active ? styles.active : ""}`}
			onClick={() => setActive(!active)}
            onKeyDown={handleKeyboard}
		></span>
	);
}
