const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F3F1F4",
  neutral300: "#D4CBD5",
  neutral400: "#B4A4B6",
  neutral500: "#94708D",
  neutral600: "#694F69",
  neutral700: "#4C394C",
  neutral800: "#311F32",
  neutral900: "#190C1A",

  primary100: "#F4E3F7",
  primary200: "#E3C2EB",
  primary300: "#D0A2DF",
  primary400: "#BC82D3",
  primary500: "#9F61B7",
  primary600: "#7B498E",

  secondary100: "#F2E2F5",
  secondary200: "#DEC3E7",
  secondary300: "#B28DC8",
  secondary400: "#865AA5",
  secondary500: "#6B388B",

  accent100: "#F6E2F8",
  accent200: "#E7C4F0",
  accent300: "#D4A2E7",
  accent400: "#BF82DE",
  accent500: "#A35DB8",

  angry100: "#F8E3EB",
  angry500: "#991840",

  overlay20: "rgba(74, 18, 79, 0.2)",
  overlay50: "rgba(74, 18, 79, 0.5)",
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
