"use client";

import { useMemo } from "react";
import { cn } from "../lib/utils";

function getShortcutKeySymbol(key: string) {
	switch (key.toLowerCase()) {
		case "mod":
		case "meta":
			return { text: "⌘", isEmoji: true };
		case "alt":
			return { text: "⌥", isEmoji: true };
		case "shift":
			return { text: "⇧", isEmoji: true };
		case "comma":
			return { text: "," };
		case "return":
		case "enter":
			return { text: "Enter" };
		case "backspace":
			return { text: "⌫", isEmoji: true };
		case "esc":
			return { text: "Esc" };
		default:
			return { text: key.trim().toUpperCase(), isEmoji: false };
	}
}

export interface KeyboardShortcutProps {
	className?: string;
	keysClassName?: string;
	shortcut: string[] | string;
}

export function KeyboardShortcut({
	shortcut,
	className,
	keysClassName,
}: KeyboardShortcutProps) {
	const keyElements = useMemo(() => {
		if (Array.isArray(shortcut)) {
			const allElements: React.ReactNode[] = [];

			shortcut.forEach((singleShortcut, shortcutIndex) => {
				const parts = singleShortcut.includes(" then ")
					? singleShortcut.split(" then ")
					: singleShortcut.split("+");

				parts.forEach((key, keyIndex) => {
					const { text, isEmoji } = getShortcutKeySymbol(key.trim());

					allElements.push(
						<span
							className={cn(
								"inline-flex min-w-5 items-center justify-center rounded-md border border-border p-1 font-normal text-foreground text-xs leading-none",
								{
									"font-[emoji]": isEmoji,
								},
								keysClassName
							)}
							key={`shortcut-${shortcutIndex}-key-${keyIndex}`}
						>
							{text}
						</span>
					);

					if (keyIndex < parts.length - 1) {
						const separator = singleShortcut.includes(" then ") ? "then" : "+";
						allElements.push(
							<span
								className="mx-1 text-muted-foreground text-xs"
								key={`shortcut-${shortcutIndex}-sep-${keyIndex}`}
							>
								{separator}
							</span>
						);
					}
				});

				if (shortcutIndex < shortcut.length - 1) {
					allElements.push(
						<span
							className="mx-2 text-muted-foreground text-xs"
							key={`or-${shortcutIndex}`}
						>
							or
						</span>
					);
				}
			});

			return allElements;
		}

		let parts: string[];
		if (shortcut === "+") {
			parts = ["+"];
		} else if (shortcut.includes(" then ")) {
			parts = shortcut.split(" then ");
		} else {
			parts = shortcut.split("+");
		}

		return parts.map((key, index) => {
			const { text, isEmoji } = getShortcutKeySymbol(key.trim());

			return (
				<span
					className={cn(
						"inline-flex min-w-5 items-center justify-center rounded-md border border-border p-1 font-normal text-foreground text-xs leading-none",
						{
							"font-[emoji]": isEmoji,
						},
						keysClassName
					)}
					key={`key-${index}`}
				>
					{text}
				</span>
			);
		});
	}, [shortcut, keysClassName]);

	return (
		<div className={cn("flex items-center justify-center gap-0", className)}>
			{keyElements}
		</div>
	);
}
