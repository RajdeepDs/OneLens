import type { DependencyList } from "react";
import {
	type HotkeyCallback,
	type Keys,
	type Options,
	useHotkeys,
} from "react-hotkeys-hook";

export interface GlobalHotkeysProps {
	keys: Keys;
	callback: HotkeyCallback;
	options?: Options & { repeat?: boolean };
	dependencies?: DependencyList;
}

export function useGlobalHotkeys({
	keys,
	callback,
	options: { repeat, ...options } = {},
	dependencies,
}: GlobalHotkeysProps) {
	useHotkeys(
		keys,
		(keyboardEvent, hotkeysEvent) => {
			if (!repeat && keyboardEvent.repeat) return;
			callback(keyboardEvent, hotkeysEvent);
		},
		{
			...options,
			enabled: options.enabled !== false,
		},
		dependencies
	);
}