import styles from "./App.module.scss";
import { useState } from "react";
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import WordDefinition from "./components/word-definition/WordDefinition";

export default function App() {
	const [word, setWord] = useState<string>("keyboard");

	return (
		<div className={styles.app}>
			<Header />
			<Searchbar />
			<WordDefinition />
		</div>
	);
}
