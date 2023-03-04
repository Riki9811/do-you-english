import { useEffect, useRef } from "react";

/**
 * Incapsulates with a hook the default javascript behaviour of `addEventListener()`.
 * The hook sets up the function `callBack` so that it will be called whenever the
 * specified `eventType` is delivered to the `target`.
 */
export default function useEventListener(eventType: keyof WindowEventMap, callBack: Function, target: EventTarget | null = window) {
	// Reference to the current value of mutable `callBack`.
	const callbackRef = useRef(callBack);

	// Updates the current reference every time `callBack` changes.
	useEffect(() => {
		callbackRef.current = callBack;
	}, [callBack]);

	// Sets up the event listening.
	useEffect(() => {
		// If there is no target specified do nothing.
		if (target == null) return;
		// Handler that executes the `callbackRef.current` on the event given in input.
		const handler: EventListenerOrEventListenerObject = (e: Event) => callbackRef.current(e);
		target.addEventListener(eventType, handler);

        // Cleanup function to remove the event listener when the `eventType` or `target` change.
		return () => target.removeEventListener(eventType, handler);
	}, [eventType, target]);
}
