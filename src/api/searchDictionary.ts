const BASE_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`;

export default async function searchDictionary(word: string) {
	const url = `${BASE_URL}/${word}`;
	return fetch(url)
		.then((response) => response.json())
		.then((json) => json[0]);
}
