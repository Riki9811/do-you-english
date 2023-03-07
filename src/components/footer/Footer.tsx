import { Github } from "react-bootstrap-icons";
import styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<footer className={`${styles.footer} ${styles.vertical}`}>
			<div className={styles.horizontal}>
				<span className={styles.light}>Project by: </span>
				<a href="https://github.com/Riki9811/" className={styles.horizontal}>
					Riccardo Mariotti
					<Github className={styles["github-logo"]} />
				</a>
			</div>
			<div className={`${styles.horizontal} ${styles.large}`}>
				<div className={styles.horizontal}>
					<span className={styles.light}>Built on: </span>
					<a href="https://github.com/Riki9811/">Dictionary API</a>
				</div>
				<div className={styles.horizontal}>
					<span className={styles.light}>Design by: </span>
					<a href="https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL">Frontend Mentor</a>
				</div>
			</div>
		</footer>
	);
}
