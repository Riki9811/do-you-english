import { WordDefinition } from "../types/WordDefinition";

const BASE_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`;
const TIMEOUT_REASON = "Timed-out";
const UNKNOWN_REASON = "Unknown";

export enum API_Status {
	ok = 200,
	notFound = 404,
	timedOut = 408,
	unknown = 500,
}

export type API_Response =
	| {
			status: API_Status.notFound | API_Status.timedOut | API_Status.unknown;
	  }
	| {
			status: API_Status.ok;
			data: WordDefinition;
	  };

export default async function searchDictionary(word: string): Promise<API_Response> {
	const url = `${BASE_URL}/${word}`;
	const response = await fetchWithTimeout(url, 6000);

	if (response === TIMEOUT_REASON) {
		return { status: API_Status.timedOut };
	} else if (response === UNKNOWN_REASON) {
		return { status: API_Status.unknown };
	} else if (response.ok) {
		const json = await response.json();
		return { status: API_Status.ok, data: json[0] };
	} else {
		return { status: API_Status.notFound };
	}
}

async function fetchWithTimeout(resource: string, timeout: number = 8000) {
	const controller = new AbortController();
	const signal = controller.signal;
	const abortRequest = setTimeout(() => controller.abort(TIMEOUT_REASON), timeout);
	try {
		const response = await fetch(resource, { signal });
		clearTimeout(abortRequest);
		return response;
	} catch (error) {
		if (signal.aborted && signal.reason === TIMEOUT_REASON) {
			return TIMEOUT_REASON;
		}
		return UNKNOWN_REASON;
	}
}
