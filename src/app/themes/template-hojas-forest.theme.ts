import { BASE_THEME_ANIMATIONS, BASE_THEME_ASSETS } from './theme-assets';
import { WeddingTheme } from './theme.types';

export const TEMPLATE_HOJAS_FOREST: WeddingTheme = {
  name: 'hojas-forest',
  displayName: 'Hojas Forest',
  palette: {
    primary: '#4A6360',
    primaryDark: '#2f4643',
    primarySoft: '#81948B',
    primaryLight: '#C6D7CF',
    coupleSeparatorText: '#4A6360',
    cardHeading: '#8B6F4A',
    accent: '#BFA880',
    heading: '#4A6360',
    text: '#4A6360',
    surface: '#FAF7F3',
    surfaceAlt: '#EFEDE7',
    muted: '#868686',
    overlay: 'rgba(74, 99, 96, 0.60)',
    success: '#10b981',
    info: '#3b82f6',
    border: '#CCC',
  },
  assets: BASE_THEME_ASSETS,
  animations: BASE_THEME_ANIMATIONS,
};
