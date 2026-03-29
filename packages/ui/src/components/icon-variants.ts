/**
 * Icon Variant System Helper
 *
 * This module demonstrates how to create icons with outline and filled variants
 * All icons from Central Icons automatically support the variant system through createIcon()
 */

/**
 * OPTION 1: Use the unified <Icon name="..." variant="outline|filled" /> component
 * This is the simplest and most flexible approach:
 */

// Usage in components:
// <Icon name="IconSettingsGear2" />
// <Icon name="IconSettingsGear2" variant="filled" size="md" />
// <Icon name="IconHeart" variant="outline" />

/**
 * OPTION 2: Use createIcon() with the unified Icon component
 * For custom wrappers, you can still use createIcon() with the icon modules:
 */

// import * as OutlineIcons from "@central-icons-react/round-outlined-radius-3-stroke-1.5";
// import * as FilledIcons from "@central-icons-react/round-filled-radius-3-stroke-1.5";
//
// export const SettingsIcon = createIcon({
//   outline: (OutlineIcons as unknown as Record<string, any>).IconSettingsGear2,
//   filled: (FilledIcons as unknown as Record<string, any>).IconSettingsGear2,
// });

/**
 * Usage Examples:
 *
 * 1. Using the unified Icon component (recommended):
 *    <Icon name="IconSettingsGear2" />
 *    <Icon name="IconSettingsGear2" variant="filled" size="md" />
 *
 * 2. With custom classes:
 *    <Icon name="IconHeart" className="text-blue-500" />
 *
 * 3. With size options:
 *    <Icon name="IconHeart" size="xs" />    // 12px
 *    <Icon name="IconHeart" size="sm" />    // 14px
 *    <Icon name="IconHeart" size="md" />    // 16px (default)
 *    <Icon name="IconHeart" size="lg" />    // 20px
 *    <Icon name="IconHeart" size="xl" />    // 24px
 *    <Icon name="IconHeart" size="2xl" />   // 32px
 *    <Icon name="IconHeart" size={18} />    // Custom size
 *
 * 4. Variant switching:
 *    <Icon name="IconStar" variant="outline" />
 *    <Icon name="IconStar" variant="filled" />    // Falls back to outline if not available
 */

