import { Sun, Moon } from "react-bootstrap-icons";
import { ReactComponent as Logo } from "../../assets/AppLogo.svg";
import useDarkMode from "../../hooks/useDarkMode";
import Dropdown from "../dropdown/Dropdown";
import Toggle from "../toggle/Toggle";
import styles from "./Header.module.scss";

export default function Header() {
	const [darkMode, setDarkMode] = useDarkMode();

	function renderThemeIcon() {
		return darkMode ? <Moon className={styles["theme-icon-moon"]} /> : <Sun className={styles["theme-icon"]} />;
	}

	return (
		<header className={styles.header}>
			<Logo className={styles.logo} />
			<h1 className={styles.title}>Do You English?</h1>
			<Dropdown />
			<span className={styles.separator} />
			<Toggle active={darkMode} setActive={setDarkMode} />
			{renderThemeIcon()}
		</header>
	);
}
