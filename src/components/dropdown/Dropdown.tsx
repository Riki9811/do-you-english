import { KeyboardEvent, useEffect, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import useFontType, { FontType } from "../../hooks/useFontType";
import styles from "./Dropdown.module.scss";

export default function Dropdown() {
	const options: FontType[] = ["serif", "sans-serif", "mono"];

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [fontPreference, setFontPreference] = useFontType("sans-serif");
	const [highlightIndex, setHighlightIndex] = useState<number>(() => options.indexOf(fontPreference));

	useEffect(() => {
		setHighlightIndex(options.indexOf(fontPreference));
	}, [isOpen, fontPreference]);

	const handleClose = () => setIsOpen(false);
	const handleToggle = () => setIsOpen((prev) => !prev);

	function handleKeyNavigation(e: KeyboardEvent) {
		switch (e.key) {
			case "Enter":
			case " ":
				if (isOpen) onPreferenceSelect();
				handleToggle();
				break;
			case "ArrowUp":
			case "ArrowDown":
				var newHighlight = highlightIndex + (e.key === "ArrowDown" ? 1 : -1);
				if (newHighlight < 0) newHighlight = 2;
				if (newHighlight > 2) newHighlight = 0;
				setHighlightIndex(newHighlight);
				break;
			case "Escape":
				handleClose();
				break;
		}
	}

	function getOptionClass(index: number) {
		return `${styles.option} ${index === highlightIndex ? styles.highlight : ""}`;
	}

	function onPreferenceSelect(index?: number) {
		if (index) setFontPreference(options[index]);
		else setFontPreference(options[highlightIndex]);
	}

	return (
		<span
			tabIndex={0}
			className={styles.dropdown}
			onClick={handleToggle}
			onBlur={handleClose}
			onKeyDown={handleKeyNavigation}
		>
			{type2Name(fontPreference)}
			<ChevronDown className={styles.chevron} />
			{isOpen ? (
				<ul className={styles.options}>
					{options.map((value, index) => (
						<li
							key={index}
							className={getOptionClass(index)}
							onMouseEnter={() => setHighlightIndex(index)}
							onClick={() => onPreferenceSelect(index)}
						>
							{type2Name(value)}
						</li>
					))}
				</ul>
			) : null}
		</span>
	);
}

function type2Name(type: FontType): string {
	switch (type) {
		case "serif":
			return "Serif";
		case "sans-serif":
			return "Sans Serif";
		case "mono":
			return "Mono";
	}
}
