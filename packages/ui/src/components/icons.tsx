export type { CentralIconBaseProps } from "@central-icons-react/round-outlined-radius-3-stroke-1.5";

import * as FilledIcons from "@central-icons-react/round-filled-radius-3-stroke-1.5";
import type { CentralIconBaseProps } from "@central-icons-react/round-outlined-radius-3-stroke-1.5";
import * as OutlineIcons from "@central-icons-react/round-outlined-radius-3-stroke-1.5";
import { cn } from "@onelens/ui/lib/utils";
import type { ComponentType, FC, SVGAttributes, SVGProps } from "react";

// Extract all icon names from OutlineIcons for type-safe autocomplete
export type IconName = Exclude<
	keyof typeof OutlineIcons,
	"CentralIconBaseProps"
>;

export type IconVariant = "outline" | "filled";

export interface IconProps extends SVGAttributes<SVGSVGElement> {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;
	variant?: IconVariant;
}

const sizeMap = {
	xs: 12,
	sm: 14,
	md: 16,
	lg: 20,
	xl: 24,
	"2xl": 32,
} as const;

function getSizeValue(size: IconProps["size"]): string | number | undefined {
	if (size === undefined) {
		return undefined;
	}
	if (typeof size === "number") {
		return size;
	}
	return sizeMap[size];
}

export interface DualVariantIconProps extends IconProps {
	variant?: IconVariant;
}

interface IconComponentRegistry {
	filled?: ComponentType<CentralIconBaseProps>;
	outline: ComponentType<CentralIconBaseProps>;
}

export const createIcon = (
	IconComponent: ComponentType<CentralIconBaseProps> | IconComponentRegistry
) => {
	const isRegistry =
		typeof IconComponent === "object" && "outline" in IconComponent;

	const outlineComponent = isRegistry
		? (IconComponent as IconComponentRegistry).outline
		: (IconComponent as ComponentType<CentralIconBaseProps>);

	const filledComponent = isRegistry
		? (IconComponent as IconComponentRegistry).filled
		: undefined;

	const IconWrapper: FC<DualVariantIconProps> = ({
		size,
		variant = "outline",
		className,
		...props
	}) => {
		const resolvedSize = getSizeValue(size);

		const SelectedComponent =
			variant === "filled" && filledComponent
				? filledComponent
				: outlineComponent;

		return (
			<span
				aria-hidden={props["aria-hidden"] ?? true}
				className={cn(
					"inline-flex shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
					className
				)}
			>
				<SelectedComponent size={resolvedSize} {...props} />
			</span>
		);
	};

	const componentName =
		(isRegistry
			? outlineComponent.displayName ||
				(outlineComponent as { name?: string }).name
			: IconComponent.displayName ||
				(IconComponent as { name?: string }).name) || "Icon";
	IconWrapper.displayName = componentName;

	return IconWrapper;
};

export interface UnifiedIconProps extends DualVariantIconProps {
	/**
	 * The icon name exactly as exported from the icon packages.
	 * e.g. "IconHeart", "IconStar", "IconSettingsGear2"
	 *
	 * @example
	 * <Icon name="IconHeart" variant="outline" size="md" />
	 */
	name: IconName;
}

export const Icon: FC<UnifiedIconProps> = ({
	name,
	variant = "outline",
	size,
	className,
	...props
}) => {
	const resolvedSize = getSizeValue(size);

	// Pick the right module based on variant, fall back to outline if filled not found
	const filledCandidate = (
		FilledIcons as unknown as Record<
			string,
			ComponentType<CentralIconBaseProps>
		>
	)[name];
	const outlineCandidate = (
		OutlineIcons as unknown as Record<
			string,
			ComponentType<CentralIconBaseProps>
		>
	)[name];

	const SelectedComponent =
		variant === "filled" && filledCandidate
			? filledCandidate
			: outlineCandidate;

	if (!SelectedComponent) {
		console.warn(`[Icon] "${name}" not found in outline or filled modules.`);
		return null;
	}

	return (
		<span
			aria-hidden={props["aria-hidden"] ?? true}
			className={cn(
				"inline-flex shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className
			)}
		>
			<SelectedComponent size={resolvedSize} {...props} />
		</span>
	);
};

Icon.displayName = "Icon";

export function createWrappedIcon(
	iconName: string,
	options?: {
		outlinedModule?: Record<string, ComponentType<CentralIconBaseProps>>;
		filledModule?: Record<string, ComponentType<CentralIconBaseProps>>;
	}
): ReturnType<typeof createIcon> | null {
	const outlinedModule = options?.outlinedModule;
	const filledModule = options?.filledModule;

	const outlined = outlinedModule ? outlinedModule[iconName] : null;

	if (!outlined) {
		console.warn(`Icon "${iconName}" not found in outlined module`);
		return null;
	}

	const filled = filledModule ? filledModule[iconName] : undefined;

	return createIcon({
		outline: outlined,
		filled,
	});
}

const GitHub = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		aria-label="GitHub"
		fill="none"
		role="img"
		viewBox="0 0 1024 1024"
	>
		<title>GitHub</title>
		<path
			clipRule="evenodd"
			d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 417.92 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-.64-52.48-.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-.64-33.92 40.32-.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-232.96-56.96-232.96-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28s87.04 5.76 128 17.28c97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-.64 123.52-.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 929.92 1024 737.92 1024 512 1024 229.12 794.88 0 512 0"
			fill="currentColor"
			fillRule="evenodd"
		/>
	</svg>
);

// Re-export commonly used icons for convenience
export const IconLoader = (
	OutlineIcons as unknown as Record<string, ComponentType<CentralIconBaseProps>>
).IconLoader;

export const IconMagnifyingGlass = (
	OutlineIcons as unknown as Record<string, ComponentType<CentralIconBaseProps>>
).IconMagnifyingGlass;

export { GitHub };
