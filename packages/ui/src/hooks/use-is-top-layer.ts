import { useEffect, useState } from "react";

const layerStack: string[] = [];
const layerListeners = new Set<() => void>();

let layerIdCounter = 0;

function generateLayerId(): string {
	return `layer-${++layerIdCounter}`;
}

function addLayer(layerId: string): void {
	layerStack.push(layerId);
	notifyListeners();
}

function removeLayer(layerId: string): void {
	const index = layerStack.indexOf(layerId);
	if (index >= 0) {
		layerStack.splice(index, 1);
		notifyListeners();
	}
}

function isTopLayer(layerId: string): boolean {
	return (
		layerStack.length === 0 || layerStack[layerStack.length - 1] === layerId
	);
}

function notifyListeners(): void {
	for (const listener of layerListeners) {
		listener();
	}
}

export function useIsTopLayer(): boolean {
	const [layerId] = useState(() => generateLayerId());
	const [isTop, setIsTop] = useState(true);

	useEffect(() => {
		addLayer(layerId);

		const updateIsTop = () => {
			setIsTop(isTopLayer(layerId));
		};

		layerListeners.add(updateIsTop);
		updateIsTop();

		return () => {
			removeLayer(layerId);
			layerListeners.delete(updateIsTop);
		};
	}, [layerId]);

	return isTop;
}