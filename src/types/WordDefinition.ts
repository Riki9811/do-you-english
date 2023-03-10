export interface WordDefinition {
	word: string;
	phonetic?: string;
	phonetics: Phonetics[];
	meanings: Meaning[];
	sourceUrls: string[];
}

export interface Phonetics {
	text?: string;
	audio?: string;
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
}

export interface Definition {
    definition: string;
    example?: string;
    synonyms: string[];
    antonyms: string[];
}
