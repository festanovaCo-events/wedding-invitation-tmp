import { ACTIVE_THEME } from './active-theme';
import { buildThemeStyleProperties } from './theme-utils';

describe('theme utilities', () => {
  it('builds CSS custom properties from the active theme palette and assets', () => {
    const properties = buildThemeStyleProperties(ACTIVE_THEME);

    expect(properties['--theme-primary']).toBe(ACTIVE_THEME.palette.primary);
    expect(properties['--theme-primary-light']).toBe(ACTIVE_THEME.palette.primaryLight);
    expect(properties['--theme-couple-separator-text']).toBe(ACTIVE_THEME.palette.coupleSeparatorText);
    expect(properties['--theme-card-heading']).toBe(ACTIVE_THEME.palette.cardHeading);
    expect(properties['--theme-heading']).toBe(ACTIVE_THEME.palette.heading);
    expect(properties['--theme-surface']).toBe(ACTIVE_THEME.palette.surface);
    expect(properties['--theme-banner-home-waves']).toContain(ACTIVE_THEME.assets.decorations.bannerHomeWaves);
  });
});
