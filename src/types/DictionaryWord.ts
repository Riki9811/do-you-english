export default interface DictionaryWord {
	word: string;
	phonetic?: string;
	phonetics: WordPhonetic[];
	meanings: WordMeaning[];
	sourceUrls: string[];
}

export interface WordPhonetic {
	text?: string;
	audio?: string;
}

export interface WordMeaning {
    partOfSpeech: string;
    definitions: WordDefinition[];
    synonyms: string[];
    antonyms: string[];
}

export interface WordDefinition {
    definition: string;
    example?: string;
    synonyms: string[];
    antonyms: string[];
}