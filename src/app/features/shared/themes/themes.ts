import { TEMPLATE_HOJAS_FOREST } from './template-hojas-forest.theme';
import { TEMPLATE_HOJAS_NAVY } from './template-hojas-navy.theme';
import { ThemeName, WeddingTheme } from './theme.types';

export const AVAILABLE_THEMES: Record<ThemeName, WeddingTheme> = {
  'hojas-navy': TEMPLATE_HOJAS_NAVY,
  'hojas-forest': TEMPLATE_HOJAS_FOREST,
};
