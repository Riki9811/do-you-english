import { Github } from "react-bootstrap-icons";
import styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<span className={styles.light}>Project by: </span>
			<a href="https://github.com/Riki9811/" className={styles["complex-link"]}>
				Riccardo Mariotti
				<Github className={styles["github-logo"]} />
			</a>
			<span className={styles.light}>Github repo: </span>
			<a href="https://github.com/Riki9811/do-you-english">do-you-english</a>
			<span className={styles.light}>Built on: </span>
			<a href="https://github.com/Riki9811/">Dictionary API</a>
			<span className={styles.light}>Design by: </span>
			<a href="https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL">Frontend Mentor</a>
		</footer>
	);
}
