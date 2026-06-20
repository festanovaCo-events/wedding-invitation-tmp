export type ThemeName = 'hojas-navy' | 'hojas-forest';

export interface ThemePalette {
  primary: string;
  primaryDark: string;
  primarySoft: string;
  primaryLight: string;
  coupleSeparatorText: string;
  cardHeading: string;
  accent: string;
  heading: string;
  text: string;
  surface: string;
  surfaceAlt: string;
  muted: string;
  overlay: string;
  success: string;
  info: string;
  border: string;
}

export interface ThemeDecorations {
  bannerHomeWaves: string;
  bannerInstagramTopWaves: string;
  bannerInstagramBottomWaves: string;
  eventCardBeltLeft: string;
  eventCardBeltRight: string;
  countdownCircle: string;
  eventScheduleWaves: string;
  eventScheduleLines: string;
  instructionsWavesTop: string;
  instructionsWavesBottom: string;
}

export interface ThemeInstructionIcons {
  dressCode: string;
  tips: string;
}

export interface ThemeAssets {
  bannerVideo: string;
  bannerImage: string;
  instagramBackground: string;
  music: string;
  decorations: ThemeDecorations;
  instructionIcons: ThemeInstructionIcons;
}

export interface ThemeAnimations {
  arrowContinue: object;
  camera: object;
  dress: object;
  gift: object;
  heart: object;
  heartPulse: object;
  instagram: object;
  music: object;
  party: object;
  rings: object;
  sounds: object;
  tips: object;
}

export interface WeddingTheme {
  name: ThemeName;
  displayName: string;
  palette: ThemePalette;
  assets: ThemeAssets;
  animations: ThemeAnimations;
}
