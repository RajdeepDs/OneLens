import type { DependencyList } from "react";
import {
	type HotkeyCallback,
	type Keys,
	type Options,
	useHotkeys,
} from "react-hotkeys-hook";
import { useIsTopLayer } from "./use-is-top-layer";

export interface LayeredHotkeysProps {
	callback: HotkeyCallback;
	dependencies?: DependencyList;
	keys: Keys;
	options?: Options & { repeat?: boolean; skipEscapeWhenDisabled?: boolean };
}

export function useLayeredHotkeys({
	keys,
	callback,
	options: { repeat, skipEscapeWhenDisabled, ...options } = {},
	dependencies,
}: LayeredHotkeysProps) {
	const isTopLayer = useIsTopLayer();

	useHotkeys(
		keys,
		(keyboardEvent, hotkeysEvent) => {
			if (!repeat && keyboardEvent.repeat) {
				return;
			}

			if (
				skipEscapeWhenDisabled &&
				keyboardEvent.key === "Escape" &&
				keyboardEvent.target &&
				keyboardEvent.target instanceof HTMLElement &&
				keyboardEvent.target.closest("[disable-escape-layered-hotkeys]")
			) {
				return;
			}

			callback(keyboardEvent, hotkeysEvent);
		},
		{
			...options,
			enabled: isTopLayer ? options.enabled : false,
		},
		dependencies
	);
}
