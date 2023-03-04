import { Dispatch, FormEvent, MouseEvent, SetStateAction, useRef } from "react";
import { Search } from "react-bootstrap-icons";
import styles from "./Searchbar.module.scss";

interface SearchbarProps {
	placeholder?: string;
	word: string;
	setWord: Dispatch<SetStateAction<string>>;
	search: Function;
}

export default function Searchbar(props: SearchbarProps) {
	const { placeholder, word, setWord, search } = props;
	const inputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef(null);

	function handleClick(e: MouseEvent) {
		if (e.target === formRef.current) inputRef.current?.focus();
	}

	function submitSearh(e: FormEvent) {
		e.preventDefault();
		if (word) {
			search();
            inputRef.current?.blur();
		}
	}

	return (
		<form ref={formRef} className={styles.searchbar} onClick={handleClick} onSubmit={submitSearh}>
			<input
				ref={inputRef}
				type="text"
				value={word}
				onChange={(e) => setWord(e.target.value)}
				placeholder={placeholder}
				className={styles["search-input"]}
			/>
			<Search className={styles["search-icon"]} onClick={submitSearh} />
		</form>
	);
}
