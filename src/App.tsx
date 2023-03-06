import { useCallback, useState } from "react";
import Header from "./components/header/Header";
import Searchbar from "./components/searchbar/Searchbar";
import WordInfo from "./components/word-info/WordInfo";
import searchDictionary from "./api/searchDictionary";
import WordDefinition from "./types/WordDefinition";
import styles from "./App.module.scss";

const DEFAULT_WORD: WordDefinition = {
	word: "test",
	phonetic: "/test/",
	phonetics: [
		{
			text: "/test/",
			audio: "https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3",
		},
		{
			text: "/test/",
			audio: "https://api.dictionaryapi.dev/media/pronunciations/en/test-us.mp3",
		},
	],
	meanings: [
		{
			partOfSpeech: "noun",
			definitions: [
				{
					definition: "A challenge, trial.",
					synonyms: [],
					antonyms: [],
				},
				{
					definition:
						"A cupel or cupelling hearth in which precious metals are melted for trial and refinement.",
					synonyms: [],
					antonyms: [],
				},
				{
					definition: "(academia) An examination, given often during the academic term.",
					synonyms: [],
					antonyms: [],
				},
				{
					definition:
						"A session in which a product or piece of equipment is examined under everyday or extreme conditions to evaluate its durability, etc.",
					synonyms: [],
					antonyms: [],
				},
				{
					definition: "(normally “Test”) A Test match.",
					synonyms: [],
					antonyms: [],
				},
				{
					definition:
						"The external calciferous shell, or endoskeleton, of an echinoderm, e.g. sand dollars and sea urchins.",
					synonyms: [],
					antonyms: [],
				},
				{
					definition: "Testa; seed coat.",
					synonyms: [],
					antonyms: [],
				},
				{
					definition: "Judgment; distinction; discrimination.",
					synonyms: [],
					antonyms: [],
				},
			],
			synonyms: ["examination", "quiz"],
			antonyms: ["recess"],
		},
		{
			partOfSpeech: "verb",
			definitions: [
				{
					definition: "To challenge.",
					synonyms: [],
					antonyms: [],
					example: "Climbing the mountain tested our stamina.",
				},
				{
					definition: "To refine (gold, silver, etc.) in a test or cupel; to subject to cupellation.",
					synonyms: [],
					antonyms: [],
				},
				{
					definition:
						"To put to the proof; to prove the truth, genuineness, or quality of by experiment, or by some principle or standard; to try.",
					synonyms: [],
					antonyms: [],
					example: "to test the soundness of a principle; to test the validity of an argument",
				},
				{
					definition:
						"(academics) To administer or assign an examination, often given during the academic term, to (somebody).",
					synonyms: [],
					antonyms: [],
				},
				{
					definition:
						"To place a product or piece of equipment under everyday and/or extreme conditions and examine it for its durability, etc.",
					synonyms: [],
					antonyms: [],
				},
				{
					definition: "To be shown to be by test.",
					synonyms: [],
					antonyms: [],
					example: "He tested positive for cancer.",
				},
				{
					definition: "To examine or try, as by the use of some reagent.",
					synonyms: [],
					antonyms: [],
					example: "to test a solution by litmus paper",
				},
			],
			synonyms: [],
			antonyms: [],
		},
	],
	sourceUrls: ["https://en.wiktionary.org/wiki/test"],
};

export default function App() {
	const [word, setWord] = useState<string>("");
	const [definition, setDefinition] = useState<WordDefinition>(DEFAULT_WORD);
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
		</div>
	);
}
