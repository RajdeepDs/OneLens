import type { DependencyList } from "react";
import {
	type HotkeyCallback,
	type Keys,
	type Options,
	useHotkeys,
} from "react-hotkeys-hook";

export interface GlobalHotkeysProps {
	callback: HotkeyCallback;
	dependencies?: DependencyList;
	keys: Keys;
	options?: Options & { repeat?: boolean };
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
			if (!repeat && keyboardEvent.repeat) {
				return;
			}
			callback(keyboardEvent, hotkeysEvent);
		},
		{
			...options,
			enabled: options.enabled !== false,
		},
		dependencies
	);
}
