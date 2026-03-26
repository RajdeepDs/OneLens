export type { CentralIconBaseProps } from "@central-icons-react/round-outlined-radius-3-stroke-1.5";
export {
	IconAlignmentCenter,
	IconAlignmentJustify,
	IconAlignmentLeft,
	IconAlignmentRight,
	IconApple,
	IconArrowDown,
	IconArrowLeft,
	IconArrowRight,
	IconArrowRotateClockwise,
	IconArrowRotateCounterClockwise,
	IconArrowRounded,
	IconArrowsRepeat,
	IconArrowUp,
	IconAudio,
	IconBackward,
	IconBag,
	IconBell,
	IconBellOff,
	IconBold,
	IconBolt,
	IconBrackets1,
	IconBrackets2,
	IconBrain,
	IconBrain1,
	IconBrain2,
	IconBrokenChainLink1,
	IconBronceMedal,
	IconBrush,
	IconBug,
	IconBuildingBlocks,
	IconBuildings,
	IconCalendar1,
	IconCalendarCheck,
	IconCamera1,
	IconCamera2,
	IconCameraOff,
	IconChainLink1,
	IconChainLink2,
	IconChart1,
	IconChart2,
	IconChart3,
	IconChart4,
	IconChart5,
	IconChart6,
	IconChart7,
	IconChartWaterfall,
	IconCheckCircle2,
	IconCheckCircle2Dashed,
	IconCheckmark1,
	IconCheckmark2,
	IconChevronBottom,
	IconChevronLeft,
	IconChevronLeftMedium,
	IconChevronRight,
	IconChevronRightMedium,
	IconChevronTop,
	IconChevronTopMedium,
	IconChip,
	IconChipSimple,
	IconCircleCheck,
	IconCircleDashed,
	IconCircleDotsCenter1,
	IconCircleInfo,
	IconCircleMinus,
	IconCirclePlus,
	IconCircleQuestionmark,
	IconCircleX,
	IconClipboard,
	IconClipboard2,
	IconClipboard2Sparkle,
	IconClock,
	IconClockSnooze,
	IconCloud,
	IconCloudCheck,
	IconCloudDownload,
	IconCloudUpload,
	IconCode,
	IconCodeLarge,
	IconCodeLines,
	IconCodeMedium,
	IconCoin1,
	IconCoin2,
	IconConsoleSimple,
	IconConsoleSimple1,
	IconConsoleSparkle,
	IconCreditCard1,
	IconCreditCard2,
	IconCrown,
	IconCurrencyDollar,
	IconDashboardFast,
	IconDashboardLow,
	IconDashboardMiddle,
	IconEditBig,
	IconEditSmall1,
	IconEditSmall2,
	IconEmail1,
	IconEmail2,
	IconEraser,
	IconEyeOpen,
	IconEyeSlash,
	IconEyeSlash2,
	IconFileDownload,
	IconFiles,
	IconFilter1,
	IconFilter2,
	IconFilterAscending,
	IconFilterDescending,
	IconFire1,
	IconFire2,
	IconFire3,
	IconFolder1,
	IconFolder2,
	IconFolderUpload,
	IconGift1,
	IconGift2,
	IconGiftBox,
	IconGithub,
	IconGlobe,
	IconGlobe2,
	IconGoldMedal,
	IconGoogle,
	IconH1,
	IconH2,
	IconH3,
	IconHammer,
	IconHammer2,
	IconHeart,
	IconHeart2,
	IconHome,
	IconImageSparkle,
	IconImages1,
	IconImages2,
	IconItalic,
	IconLayoutDashboard,
	IconLayoutGrid1,
	IconLayoutGrid2,
	IconLightBulb,
	IconLightBulbSimple,
	IconLightbulbSparkle,
	IconLoader,
	IconLock,
	IconMagicWand,
	IconMagicWand2,
	IconMagnifyingGlass,
	IconMagnifyingGlass2,
	IconMedal,
	IconMicrophone,
	IconMicrophoneOff,
	IconMinusSmall,
	IconMoon,
	IconMute,
	IconNoFlash,
	IconPageText,
	IconPause,
	IconPencil,
	IconPencil2,
	IconPencil3,
	IconPeople,
	IconPeopleCircle,
	IconPercent,
	IconPhone,
	IconPieChart1,
	IconPieChart2,
	IconPlay,
	IconPlusLarge,
	IconPlusSmall,
	IconRepeat,
	IconRocket,
	IconServer,
	IconServer1,
	IconServer2,
	IconSettingsGear1,
	IconSettingsGear2,
	IconShoppingBag1,
	IconShoppingBag2,
	IconSidebar,
	IconSidebarFloating,
	IconSilverMedal,
	IconSkip,
	IconSparkle,
	IconSparkle2,
	IconSquareArrowTopRight,
	IconSquareBehindSquare2,
	IconStar,
	IconStepBack,
	IconStepForwards,
	IconStop,
	IconStorage,
	IconSun,
	IconTag,
	IconTarget,
	IconTarget1,
	IconTarget2,
	IconToolbox,
	IconTranslate,
	IconTrashCan,
	IconTrashCanSimple,
	IconTrending1,
	IconTrending2,
	IconTrending3,
	IconTrending4,
	IconTrending5,
	IconTrophy,
	IconTwitter,
	IconUnderline,
	IconUnlocked,
	IconUser,
	IconVideo,
	IconVideoOff,
	IconVideoOn,
	IconVolumeFull,
	IconVolumeOff,
	IconWallet1,
	IconWarningSign,
	IconX,
	IconZap,
} from "@central-icons-react/round-outlined-radius-3-stroke-1.5";

import type { CentralIconBaseProps } from "@central-icons-react/round-outlined-radius-3-stroke-1.5";
import { cn } from "@onelens/ui/lib/utils";
import type { ComponentType, FC, SVGAttributes, SVGProps } from "react";

export interface IconProps extends SVGAttributes<SVGSVGElement> {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;
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

export const createIcon = (
	IconComponent: ComponentType<CentralIconBaseProps>
) => {
	const IconWrapper: FC<IconProps> = ({ size, className, ...props }) => {
		const resolvedSize = getSizeValue(size);

		return (
			<span
				aria-hidden={props["aria-hidden"] ?? true}
				className={cn(
					"inline-flex shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
					className
				)}
			>
				<IconComponent size={resolvedSize} {...props} />
			</span>
		);
	};

	const componentName =
		IconComponent.displayName ||
		(IconComponent as { name?: string }).name ||
		"Icon";
	IconWrapper.displayName = componentName;

	return IconWrapper;
};

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

export { GitHub };
