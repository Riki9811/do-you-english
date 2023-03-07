import { useMemo, useState } from "react";
import { BoxArrowUpRight, PlayFill, StopFill } from "react-bootstrap-icons";
import useEventListener from "../../hooks/useEventListener";
import WordDefinition from "../../types/WordDefinition";
import styles from "./WordInfo.module.scss";

interface WordInfoProps {
	info?: WordDefinition;
	error: string;
}

export default function WordInfo({ info: rawInfo, error }: WordInfoProps) {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const info = useMemo(() => rawInfoCleaner(rawInfo), [rawInfo]);

	useEventListener("ended", () => setIsPlaying(false), info?.audio);

	function toggleAudio() {
		if (!info?.audio) return;

		if (info.audio.paused) {
			info.audio.play();
			setIsPlaying(true);
		} else {
			info.audio.pause();
			info.audio.currentTime = 0;
			setIsPlaying(false);
		}
	}

	function renderPronunciation(word: string, pronunciation: string, audio?: HTMLAudioElement) {
		return (
			<div className={styles["word-pronunciation"]}>
				<h1>{word}</h1>
				<h2>{pronunciation}</h2>
				{audio && (
					<button onClick={toggleAudio}>
						{isPlaying ? (
							<StopFill className={styles["stop-icon"]} />
						) : (
							<PlayFill className={styles["play-icon"]} />
						)}
					</button>
				)}
			</div>
		);
	}

	function renderMeaning(meaning: CleanMeaning, index: number): JSX.Element {
		return (
			<div key={index} className={styles["word-meaning"]}>
				<div className={styles.horizontal}>
					<h3>{meaning.partOfSpeech}</h3>
					<span className={styles.spacer} />
				</div>

				<div className={styles.definitions}>
					Meaning:
					<ul>
						{meaning.definitions.map((def, index) => (
							<li key={index}>
								{def.definition} {def.example ? <span>"{def.example}"</span> : null}
							</li>
						))}
					</ul>
				</div>

				{renderWordArray(meaning.synonyms, "Synonyms")}

				{renderWordArray(meaning.antonyms, "Antonyms")}
			</div>
		);
	}

	function renderWordArray(array: string[], caption: string) {
		if (array.length === 0) return;
		return (
			<div className={styles.array}>
				{caption}: <span>{array.join(", ")}</span>
			</div>
		);
	}

	function renderUrlArray(urls: string[], caption: string) {
		return (
			<div className={styles.sources}>
				<span className={styles.spacer} />
				<p>{caption}</p>
				<span>
					{urls.map((url, index) => (
						<a key={index} href={url}>
							{url} <BoxArrowUpRight />
						</a>
					))}
				</span>
			</div>
		);
	}

	if (error) return <p>{error}</p>; // If there is an error show it
	if (!info) return <></>; // If there is no error and no info show nothing

	// Show the info
	return (
		<div className={styles["word-info"]}>
			{renderPronunciation(info.word, info.pronunciation, info.audio)}
			{info.meanings.map((meaning, index) => renderMeaning(meaning, index))}
			{renderUrlArray(info.sourceUrls, info.sourceUrls.length > 1 ? "Sources: " : "Source: ")}
		</div>
	);
}

//#region CLEAN INFO
interface CleanInfo {
	word: string;
	pronunciation: string;
	audio?: HTMLAudioElement;
	meanings: CleanMeaning[];
	sourceUrls: string[];
}

interface CleanMeaning {
	partOfSpeech: string;
	definitions: {
		definition: string;
		example?: string;
	}[];
	synonyms: string[];
	antonyms: string[];
}

function rawInfoCleaner(rawInfo?: WordDefinition): CleanInfo | undefined {
	if (!rawInfo) return undefined;

	var word = rawInfo.word;
	var pronunciation = rawInfo.phonetic ? rawInfo.phonetic : "";
	var audio;
	var meanings: CleanMeaning[] = [];
	var sourceUrls = [...rawInfo.sourceUrls];

	for (const phonetics of rawInfo.phonetics) {
		if (!pronunciation && phonetics.text) pronunciation = phonetics.text;
		if (!audio && phonetics.audio) audio = new Audio(phonetics.audio);
	}

	for (const meaning of rawInfo.meanings) {
		var newMeaning: CleanMeaning = {
			...meaning,
			definitions: meaning.definitions.map((def) => ({ definition: def.definition, example: def.example })),
		};
		meanings.push(newMeaning);
	}

	return { word, pronunciation, audio, meanings, sourceUrls };
}
//#endregion
