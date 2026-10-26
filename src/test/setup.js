import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom has no browser top layer; application behaviour is tested separately
// from the native dialog's browser-provided focus containment.
HTMLDialogElement.prototype.showModal = function () {
  this.open = true;
};
HTMLDialogElement.prototype.close = function () {
  this.open = false;
};
window.scrollTo = vi.fn();
window.matchMedia = vi.fn((query) => ({
  matches: false,
  media: query,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

afterEach(() => {
  cleanup();
  localStorage.clear();
  window.history.replaceState(null, '', '/');
  delete document.documentElement.dataset.theme;
});
