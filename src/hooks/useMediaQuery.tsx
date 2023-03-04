import { useState, useEffect } from "react";
import useEventListener from "./useEventListener";

/**
 * Incapsulates with a hook the behaviour of cee media queries.
 * The hook returns a stateful boolean indicating whether the qury is
 * matched or not. The boolean will automatically update when the query changes result.
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
