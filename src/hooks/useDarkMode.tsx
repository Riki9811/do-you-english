import { useEffect } from "react";
import useMediaQuery from "./useMediaQuery";
import { useLocalStorage } from "./useStorage";

/**
 * Detects the default user preference between dark/light mode.
 * Automatically adds the `className` to the class list of the body of the page.
 * Saves in `localStorage` any changes from the default option.
 * 
 * @param {string} [className="dark-mode"] - The name of the class to add to the body
 * 
 * @return Whether the user prefers dark mode
 * @return Function to update user preference and save it in `localStorage`
 */
export default function useDarkMode(className: string = "dark-mode"): [boolean, React.Dispatch<boolean>] {
	const [darkMode, setDarkMode] = useLocalStorage<boolean>("useDarkMode");
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const enabled = darkMode ?? prefersDarkMode;

	useEffect(() => {
		document.body.classList.toggle(className, enabled);
	}, [enabled]);

	return [enabled, setDarkMode];
}
