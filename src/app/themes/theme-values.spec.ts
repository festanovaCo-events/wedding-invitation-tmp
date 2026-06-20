import { TEMPLATE_HOJAS_FOREST } from './template-hojas-forest.theme';
import { TEMPLATE_HOJAS_NAVY } from './template-hojas-navy.theme';

describe('theme palette values', () => {
  it('uses the primary color for navy headings', () => {
    expect(TEMPLATE_HOJAS_NAVY.palette.heading).toBe('#425e87');
  });

  it('keeps forest headings on the forest primary color', () => {
    expect(TEMPLATE_HOJAS_FOREST.palette.heading).toBe('#4A6360');
  });

  it('uses a dedicated color for card headings', () => {
    expect(TEMPLATE_HOJAS_FOREST.palette.cardHeading).toBe('#8B6F4A');
    expect(TEMPLATE_HOJAS_NAVY.palette.cardHeading).toBe('#425e87');
  });
});
