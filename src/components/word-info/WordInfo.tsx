import { useMemo, useState } from "react";
import { PlayFill, StopFill } from "react-bootstrap-icons";
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

	function renderMeaning(meaning: CleanMeaning): JSX.Element {
		return (
			<div className={styles["word-meaning"]}>
				<div className={styles.horizontal}>
					<h3>{meaning.partOfSpeech}</h3>
					<span className={styles.spacer} />
				</div>

				<div className={styles.definitions}>
					Meaning:
					<ul>
						{meaning.definitions.map((def) => (
							<li>
								{def.definition} {def.example ? <span>"{def.example}"</span> : null}
							</li>
						))}
					</ul>
				</div>

				{meaning.synonyms.length > 0 && (
					<div className={styles.synonyms}>
						Synonyms: <span>{meaning.synonyms.join(", ")}</span>
					</div>
				)}

				{meaning.antonyms.length > 0 && (
					<div className={styles.antonyms}>
						Antonyms: <span>{meaning.antonyms.join(", ")}</span>
					</div>
				)}
			</div>
		);
	}

	if (error) return <p>{error}</p>; // If there is an error show it
	if (!info) return <></>; // If there is no error and no info show nothing

	// Show the info
	return (
		<div className={styles["word-info"]}>
			<div className={styles["word-pronunciation"]}>
				<h1>{info.word}</h1>
				<h2>{info.pronunciation}</h2>
				{info.audio && (
					<button onClick={toggleAudio}>
						{isPlaying ? (
							<StopFill className={styles["stop-icon"]} />
						) : (
							<PlayFill className={styles["play-icon"]} />
						)}
					</button>
				)}
			</div>
			{info.meanings.map((meaning) => renderMeaning(meaning))}
		</div>
	);
}

//#region CLEAN INFO
interface CleanInfo {
	word: string;
	pronunciation: string;
	audio?: HTMLAudioElement;
	meanings: CleanMeaning[];
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

	return { word, pronunciation, audio, meanings };
}
//#endregion
