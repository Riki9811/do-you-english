import { useCallback, useState } from "react";
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import WordInfo from "./components/word-info/WordInfo";
import searchDictionary from "./api/searchDictionary";
import { WordDefinition, WordNotFoundInfo } from "./types/WordDefinition";
import styles from "./App.module.scss";
import Footer from "./components/footer/Footer";

const NOT_FOUND_MSG = "Sorry, we couldn't find the word you were looking for.";

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
		setDefinition(undefined);

		const result: WordDefinition | WordNotFoundInfo = await searchDictionary(newWord);
		if (isNotFoundInfo(result)) setErrString(NOT_FOUND_MSG);
		else setDefinition(result);
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
			<WordInfo
				info={definition}
				error={errString}
				searchWord={searchNewWord}
			/>
			<Footer />
		</div>
	);
}

function isNotFoundInfo(object: any): object is WordNotFoundInfo {
	return "title" in object;
}
