import { WeddingTheme } from './theme.types';

export type ThemeStyleProperties = Record<`--theme-${string}`, string>;

function cssUrl(assetPath: string): string {
  return `url("${assetPath}")`;
}

export function buildThemeStyleProperties(theme: WeddingTheme): ThemeStyleProperties {
  return {
    '--theme-primary': theme.palette.primary,
    '--theme-primary-dark': theme.palette.primaryDark,
    '--theme-primary-soft': theme.palette.primarySoft,
    '--theme-primary-light': theme.palette.primaryLight,
    '--theme-couple-separator-text': theme.palette.coupleSeparatorText,
    '--theme-card-heading': theme.palette.cardHeading,
    '--theme-accent': theme.palette.accent,
    '--theme-heading': theme.palette.heading,
    '--theme-text': theme.palette.text,
    '--theme-surface': theme.palette.surface,
    '--theme-surface-alt': theme.palette.surfaceAlt,
    '--theme-muted': theme.palette.muted,
    '--theme-overlay': theme.palette.overlay,
    '--theme-success': theme.palette.success,
    '--theme-info': theme.palette.info,
    '--theme-border': theme.palette.border,
    '--theme-banner-home-bg': cssUrl(theme.assets.bannerImage),
    '--theme-banner-home-waves': cssUrl(theme.assets.decorations.bannerHomeWaves),
    '--theme-banner-instagram-bg': cssUrl(theme.assets.instagramBackground),
    '--theme-banner-instagram-top-waves': cssUrl(theme.assets.decorations.bannerInstagramTopWaves),
    '--theme-banner-instagram-bottom-waves': cssUrl(theme.assets.decorations.bannerInstagramBottomWaves),
    '--theme-event-card-belt-left': cssUrl(theme.assets.decorations.eventCardBeltLeft),
    '--theme-event-card-belt-right': cssUrl(theme.assets.decorations.eventCardBeltRight),
    '--theme-countdown-circle': cssUrl(theme.assets.decorations.countdownCircle),
    '--theme-event-schedule-waves': cssUrl(theme.assets.decorations.eventScheduleWaves),
    '--theme-event-schedule-lines': cssUrl(theme.assets.decorations.eventScheduleLines),
    '--theme-instructions-waves-top': cssUrl(theme.assets.decorations.instructionsWavesTop),
    '--theme-instructions-waves-bottom': cssUrl(theme.assets.decorations.instructionsWavesBottom),
  };
}

export function applyThemeStyleProperties(theme: WeddingTheme, target: HTMLElement): void {
  const properties = buildThemeStyleProperties(theme);

  Object.entries(properties).forEach(([name, value]) => {
    target.style.setProperty(name, value);
  });

  target.dataset['theme'] = theme.name;
}
