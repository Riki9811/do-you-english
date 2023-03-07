import { useCallback, useState } from "react";
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import WordInfo from "./components/word-info/WordInfo";
import searchDictionary from "./api/searchDictionary";
import WordDefinition from "./types/WordDefinition";
import styles from "./App.module.scss";
import Footer from "./components/footer/Footer";

export default function App() {
	const [word, setWord] = useState<string>("");
	const [definition, setDefinition] = useState<WordDefinition>();
    const [errString, setErrString] = useState<string>("");

	const searchWord = useCallback(async () => {
		if (!word) return;
		setErrString("");
		// const abort = new AbortController();
		const result: WordDefinition = await searchDictionary(word);
		if (result) setDefinition(result);
		else setErrString(`Unknown error on word: ${word}`);
	}, [word]);

	return (
		<div className={styles.app}>
			<Header />
			<Searchbar word={word} setWord={setWord} placeholder="Search a word..." search={searchWord} />
			<WordInfo info={definition} error={errString} />
			<Footer />
		</div>
	);
}
