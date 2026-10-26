import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');

function tokensIn(block) {
  return Object.fromEntries(
    [...block.matchAll(/(--[\w-]+):\s*(#[\da-f]{6})\s*;/gi)].map((match) => [match[1], match[2]]),
  );
}

const light = tokensIn(css.match(/:root\s*\{([^}]+)\}/)[1]);
const themes = {
  light,
  dark: { ...light, ...tokensIn(css.match(/:root\[data-theme='dark'\]\s*\{([^}]+)\}/)[1]) },
  contrast: {
    ...light,
    ...tokensIn(css.match(/:root\[data-theme='contrast'\]\s*\{([^}]+)\}/)[1]),
  },
};

function luminance(hex) {
  const linear = [1, 3, 5].map((offset) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function ratio(first, second) {
  const [low, high] = [luminance(first), luminance(second)].sort((a, b) => a - b);
  return (high + 0.05) / (low + 0.05);
}

describe.each(Object.entries(themes))('%s palette', (name, tokens) => {
  it('preserves readable text and button labels, including hover states', () => {
    const surfaces = ['--bg', '--surface', '--surface-soft', '--accent'];
    const pairs = ['--text', '--muted', '--primary'].flatMap((foreground) =>
      surfaces.map((background) => [foreground, background]),
    );
    pairs.push(
      ['--on-primary', '--primary'],
      ['--on-primary', '--primary-hover'],
      ['--hero-text', '--hero'],
      ['--hero-muted', '--hero'],
      ['--hero-accent', '--hero'],
      ['--hero-button-text', '--hero-button'],
      ['--hero-button-text', '--hero-button-hover'],
    );
    for (const [foreground, background] of pairs) {
      expect(
        ratio(tokens[foreground], tokens[background]),
        `${name}: ${foreground} on ${background}`,
      ).toBeGreaterThanOrEqual(name === 'contrast' ? 7 : 4.5);
    }
  });

  it('keeps control boundaries and keyboard focus at or above 3:1', () => {
    const controlSurfaces = [
      '--bg',
      '--surface',
      '--surface-soft',
      '--accent',
      '--sage',
      '--peach',
      '--lavender',
      '--sand',
    ];
    for (const background of controlSurfaces) {
      expect(
        ratio(tokens['--control-border'], tokens[background]),
        `${name}: control boundary on ${background}`,
      ).toBeGreaterThanOrEqual(3);
    }
    for (const background of ['--bg', '--surface', '--surface-soft', '--accent']) {
      expect(ratio(tokens['--focus'], tokens[background])).toBeGreaterThanOrEqual(3);
    }
    expect(ratio(tokens['--hero-accent'], tokens['--hero'])).toBeGreaterThanOrEqual(3);
  });
});
