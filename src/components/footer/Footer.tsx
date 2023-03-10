import { Github } from "react-bootstrap-icons";
import styles from "./Footer.module.scss";

const LINKS = {
	gitProfile: "https://github.com/Riki9811/",
	gitRepo: "https://github.com/Riki9811/do-you-english",
	dictApi: "https://dictionaryapi.dev",
	frontEndMentor: "https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL",
};

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<span className={styles.light}>Project by: </span>
			<a href={LINKS.gitProfile} className={styles["complex-link"]}>
				Riccardo Mariotti
				<Github className={styles["github-logo"]} />
			</a>

            <div className={styles.desktop} />

			<span className={styles.light}>Github repo: </span>
			<a href={LINKS.gitRepo}>do-you-english</a>

			<span className={`${styles.light} ${styles.desktop}`}>Built on: </span>
			<a className={styles.desktop} href={LINKS.dictApi}>
				Dictionary API
			</a>

            <div className={styles.desktop} />

			<span className={`${styles.light} ${styles.desktop}`}>Design by: </span>
			<a className={styles.desktop} href={LINKS.frontEndMentor}>
				Frontend Mentor
			</a>
		</footer>
	);
}
