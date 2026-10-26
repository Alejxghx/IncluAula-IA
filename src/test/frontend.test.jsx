import { describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LazyMotion, domAnimation } from 'framer-motion';
import App from '../App.jsx';
import { initialPrefs, DEFAULTS } from '../preferences.js';
import { pageFromHash } from '../hooks/useNavigation.js';

function renderApp() {
  return render(
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>,
  );
}

describe('frontend accessibility regressions', () => {
  it('keeps the visible brand in its accessible name and hides decorative SVGs', () => {
    const { container } = renderApp();
    const brand = screen.getByRole('link', { name: 'IncluAula IA, inicio' });
    expect(brand.textContent.replace(/\s+/g, ' ').trim()).toBe('IncluAula IA');
    expect(screen.getByRole('img', { name: 'Espacio de estudiante' })).toBeTruthy();
    const icons = [...container.querySelectorAll('svg')];
    expect(icons.length).toBeGreaterThan(20);
    expect(icons.every((icon) => icon.getAttribute('aria-hidden') === 'true')).toBe(true);
  });

  it('keeps the bookmark name stable while the pressed state changes', async () => {
    const user = userEvent.setup();
    renderApp();
    const bookmark = screen.getByRole('button', {
      name: 'Guardar material: Un mundo de ecosistemas',
    });
    expect(bookmark.getAttribute('aria-pressed')).toBe('false');
    await user.click(bookmark);
    expect(bookmark.getAttribute('aria-pressed')).toBe('true');
    expect(bookmark.getAttribute('aria-label')).toBe('Guardar material: Un mundo de ecosistemas');
    await user.click(bookmark);
    expect(bookmark.getAttribute('aria-pressed')).toBe('false');
  });

  it('associates switch descriptions and persists the chosen theme', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole('button', { name: 'Accesibilidad' }));
    const dialog = screen.getByRole('dialog', { name: 'Preferencias de accesibilidad' });
    for (const control of within(dialog).getAllByRole('switch')) {
      const description = document.getElementById(control.getAttribute('aria-describedby'));
      expect(description?.textContent.length).toBeGreaterThan(10);
    }
    await user.click(within(dialog).getByRole('radio', { name: 'Oscuro' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(initialPrefs().theme).toBe('dark');
    await user.click(within(dialog).getByRole('button', { name: 'Restablecer' }));
    expect(initialPrefs()).toEqual(DEFAULTS);
  });
});

describe('navigation and stored data', () => {
  it('opens a copied library URL and follows browser history changes', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/#/biblioteca');
    renderApp();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Un mundo por descubrir.');
    await user.click(
      within(screen.getByRole('navigation', { name: 'Navegación principal' })).getByRole('link', {
        name: 'Guardados',
      }),
    );
    await waitFor(() => expect(window.location.hash).toBe('#/guardados'));
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
        'Tus próximos descubrimientos.',
      ),
    );
    window.history.back();
    await waitFor(() => expect(window.location.hash).toBe('#/biblioteca'));
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Un mundo por descubrir.'),
    );
    window.history.forward();
    await waitFor(() => expect(window.location.hash).toBe('#/guardados'));
  });

  it('filters accented titles when the query has no accent', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/#/biblioteca');
    renderApp();
    await user.type(
      screen.getByRole('searchbox', { name: 'Buscar materiales por título o asignatura' }),
      'geometria',
    );
    expect(screen.getByRole('button', { name: 'La geometría a tu alrededor' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Un mundo de ecosistemas' })).toBeNull();
  });

  it('tolerates corrupt or invalid preferences and unknown routes', () => {
    localStorage.setItem('incluaula.preferences.v1', '{broken');
    expect(initialPrefs()).toEqual(DEFAULTS);
    localStorage.setItem(
      'incluaula.preferences.v1',
      JSON.stringify({ theme: 'invalid', size: 800 }),
    );
    expect(initialPrefs()).toEqual(DEFAULTS);
    expect(pageFromHash('#/unknown')).toBe('home');
  });
});
