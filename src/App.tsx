import { useCallback, useState } from "react";
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import WordInfo from "./components/word-info/WordInfo";
import searchDictionary, { API_Response } from "./api/searchDictionary";
import { WordDefinition } from "./types/WordDefinition";
import styles from "./App.module.scss";
import Footer from "./components/footer/Footer";

const NOT_FOUND_MSG = "Sorry, we couldn't find the word you were looking for.";
const TIME_OUT_MSG = "Sorry, the connection timed out, try later.";
const UNKNOWN_ERR_MSG = "Sorry, an unknown error occurred.";

export default function App() {
	const [word, setWord] = useState<string>("");
	const [definition, setDefinition] = useState<WordDefinition>();
	const [loading, setLoading] = useState<boolean>(false);
	const [errString, setErrString] = useState<string>("");

	const searchWord = useCallback(() => searchNewWord(word), [word]);

	const searchNewWord = useCallback(async (newWord: string) => {
		if (!newWord) return;
		if (word !== newWord) setWord(newWord);

		setLoading(true);
		setErrString("");

		const result: API_Response = await searchDictionary(newWord);

		switch (result.status) {
			case 200:
				setDefinition(result.data);
				break;
			case 404:
				setDefinition(undefined);
				setErrString(NOT_FOUND_MSG);
				break;
			case 408:
				setDefinition(undefined);
				setErrString(TIME_OUT_MSG);
				break;
			case 500:
				setDefinition(undefined);
				setErrString(UNKNOWN_ERR_MSG);
				break;
		}
		setLoading(false);
	}, []);

	return (
		<div className={styles.app}>
			<Header />
			<Searchbar
				word={word}
				setWord={setWord}
				placeholder="Search a word..."
				search={searchWord}
				isLoading={loading}
			/>
			<WordInfo info={definition} error={errString} searchWord={searchNewWord} />
			<Footer />
		</div>
	);
}
