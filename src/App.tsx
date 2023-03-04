import { useCallback, useState } from "react";
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import WordDefinition from "./components/word-definition/WordDefinition";
import styles from "./App.module.scss";

export default function App() {
	const [word, setWord] = useState<string>("");
	const searchWord = useCallback(() => {
		console.log(word);
	}, [word]);

	return (
		<div className={styles.app}>
			<Header />
			<Searchbar word={word} setWord={setWord} placeholder="Search a word..." search={searchWord} />
			<WordDefinition />
		</div>
	);
}
