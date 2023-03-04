import { useState, useEffect } from "react";
import useEventListener from "./useEventListener";

/**
 * Incapsulates with a hook the default javascript behaviour of `addEventListener()`.
 * The hook sets up the function `callBack` so that it will be called whenever the
 * specified `eventType` is delivered to the `target`.
 * 
 * @returns A stateful value indicating whether the query is matched or not.
 */
export default function useMediaQuery(mediaQuery: string): boolean {
	// Boolean indicating if the media query is matched or not.
	const [isMatch, setIsMatch] = useState(false);
	// Match result, used for listening events on media query state change.
	const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>();

	// Sets up the query every time `mediaQuery` changes.
	useEffect(() => {
		const list = window.matchMedia(mediaQuery);
		setMediaQueryList(list);
		setIsMatch(list.matches);
	}, [mediaQuery]);

	// Listens to state change of the `mediaQueryList` and updates `isMatch` accordingly.
	useEventListener("change", (e: MediaQueryListEvent) => setIsMatch(e.matches), mediaQueryList);

	return isMatch;
}
