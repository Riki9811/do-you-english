import { useEffect } from "react";
import { useLocalStorage } from "./useStorage";

export type FontType = "serif" | "sans-serif" | "mono";

/**
 * Reads the user preference for the font type (serif, sans-serif, monospace)
 * saved in the local storage and saves any changes. If there is no preference
 * stored it will default to `defaultValue` if given and to sans-serif otherwise.
 *
 * @param {string} [defaultValue="sans-serif"] - Default font type to use.
 *
 * @return What type of font the user prefers.
 * @return Function to change user preference.
 */
export default function useFontType(defaultValue: FontType = "sans-serif"): [FontType, React.Dispatch<FontType>] {
	const [storedType, setStoredType] = useLocalStorage<FontType>("font-type");
	const preferredType = storedType ?? defaultValue;

	useEffect(() => {
		switch (preferredType) {
			case "serif":
				document.body.classList.remove("sans-serif-font");
				document.body.classList.remove("mono-font");
				break;
			case "sans-serif":
				document.body.classList.remove("serif-font");
				document.body.classList.remove("mono-font");
				break;
			case "mono":
				document.body.classList.remove("serif-font");
				document.body.classList.remove("sans-serif-font");
				break;
		}
		document.body.classList.add(`${preferredType}-font`);
	}, [preferredType]);

	return [preferredType, setStoredType];
}
