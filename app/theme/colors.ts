const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F7F0F5",
  neutral300: "#E5D5E2",
  neutral400: "#C5A7C1",
  neutral500: "#92448B",
  neutral600: "#492343",
  neutral700: "#3C0C1D",
  neutral800: "#2D0915",
  neutral900: "#1F060E",

  primary100: "#F5E8F3",
  primary200: "#E7CDE3",
  primary300: "#DD9FD1",
  primary400: "#C08BC1",
  primary500: "#92448B",
  primary600: "#492343",

  secondary100: "#F3E8F1",
  secondary200: "#E2CDE0",
  secondary300: "#C08BC1",
  secondary400: "#92448B",
  secondary500: "#492343",

  accent100: "#F6E9F2",
  accent200: "#E8CFE3",
  accent300: "#DD9FD1",
  accent400: "#B679AC",
  accent500: "#92448B",

  angry100: "#F9E6EB",
  angry500: "#3C0C1D",

  overlay20: "rgba(73, 35, 67, 0.2)",
  overlay50: "rgba(73, 35, 67, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,

  link: "rgba(0, 118, 252, 1)",
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
} as const
