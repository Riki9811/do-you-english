import { ReactComponent as Logo } from "../../assets/AppLogo.svg";
import styles from "./Header.module.scss";

export default function Header() {
	return (
		<h1>
			Header
			<Logo className={styles.logo} />
		</h1>
	);
}
