export const DEFAULTS = {
  theme: 'light',
  size: 100,
  spacing: false,
  reducedMotion: false,
  focus: false,
};

export function readSaved(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function initialPrefs() {
  const saved = readSaved('incluaula.preferences.v1', {});
  return {
    theme: ['light', 'dark', 'contrast'].includes(saved.theme) ? saved.theme : 'light',
    size: [100, 112, 125].includes(saved.size) ? saved.size : 100,
    spacing: saved.spacing === true,
    reducedMotion: saved.reducedMotion === true,
    focus: saved.focus === true,
  };
}
