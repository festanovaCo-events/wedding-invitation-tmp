import { BASE_THEME_ANIMATIONS, BASE_THEME_ASSETS } from './theme-assets';
import { WeddingTheme } from './theme.types';

export const TEMPLATE_HOJAS_NAVY: WeddingTheme = {
  name: 'hojas-navy',
  displayName: 'Hojas Navy',
  palette: {
    primary: '#425e87',
    primaryDark: '#0e243c',
    primarySoft: '#6c86ab',
    primaryLight: '#6c86ab',
    coupleSeparatorText: '#ffffff',
    cardHeading: '#425e87',
    accent: '#BFA880',
    heading: '#425e87',
    text: '#425e87',
    surface: '#FAF7F3',
    surfaceAlt: '#EFEDE7',
    muted: '#868686',
    overlay: 'rgba(74, 79, 96, 0.60)',
    success: '#425e87',
    info: '#6c86ab',
    border: '#CCC',
  },
  assets: BASE_THEME_ASSETS,
  animations: BASE_THEME_ANIMATIONS,
};
