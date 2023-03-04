import { useCallback, useState, useEffect } from "react";

/**
 * Creates a `useStorage` hook, setting it up to work on `window.localStorage`.
 * @see {@link useStorage} for implementation details.
 */
export function useLocalStorage<K>(key: string, defaultValue?: K) {
	return useStorage(key, window.localStorage, defaultValue);
}

/**
 * Creates a `useStorage` hook, setting it up to work on `window.sessionStorage`.
 * @see {@link useStorage} for implementation details.
 */
export function useSessionStorage<K>(key: string, defaultValue?: K) {
	return useStorage(key, window.sessionStorage, defaultValue);
}

/**
 * Uses the `storageObject` provided to save pairs of key-value items inside it.
 * 
 * When first creating the hook if there is no value previously saved in the storage
 * for the given `key` the `defaultValue` will be used.
 * 
 * This hook is used by {@link useSessionStorage} and {@link useLocalStorage}.
 * 
 * @return The value paired to the `key` in `storageObject`.
 * @return A function to update the value.
 * @return A function to remove the key-value pair from `storageObject`
 */
function useStorage<K>(key: string, storageObject: Storage, defaultValue: K): [K | undefined, React.Dispatch<K>, () => void] {
	// Value paired to the given `key`.
	const [value, setValue] = useState<K | undefined>(() => {
		// Get the value from the storage if there is one
		const jsonValue = storageObject.getItem(key);
		if (jsonValue != null) return JSON.parse(jsonValue);

		// Otherwise use `defaultValue`
		if (typeof defaultValue === "function") {
			return defaultValue();
		} else {
			return defaultValue;
		}
	});

	// Update the key-value entry in storage every time there is a change
	useEffect(() => {
		// Remove the key-value entry if value is `undefined`
		if (value === undefined) return storageObject.removeItem(key);
		// Set the value otherwise
		storageObject.setItem(key, JSON.stringify(value));
	}, [key, value, storageObject]);

	// Callback to remove the key-value entry from the
	const remove = useCallback(() => {
		setValue(undefined);
	}, []);

	return [value, setValue, remove];
}
