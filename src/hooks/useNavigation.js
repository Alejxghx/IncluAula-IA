import { useCallback, useEffect, useState } from 'react';

export const PAGE_HASH = {
  home: '#/inicio',
  library: '#/biblioteca',
  saved: '#/guardados',
};

export function pageFromHash(hash) {
  return Object.keys(PAGE_HASH).find((page) => PAGE_HASH[page] === hash) ?? 'home';
}

export function useNavigation(mainRef) {
  const [page, setPage] = useState(() => pageFromHash(window.location.hash));

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', PAGE_HASH.home);
    }
    function syncPage() {
      // The skip link moves focus without changing the current application view.
      if (window.location.hash === '#main') return;
      setPage(pageFromHash(window.location.hash));
      requestAnimationFrame(() => {
        mainRef.current?.focus();
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    }
    window.addEventListener('hashchange', syncPage);
    window.addEventListener('popstate', syncPage);
    return () => {
      window.removeEventListener('hashchange', syncPage);
      window.removeEventListener('popstate', syncPage);
    };
  }, [mainRef]);

  const navigate = useCallback((next) => {
    if (PAGE_HASH[next]) window.location.hash = PAGE_HASH[next];
  }, []);

  return { page, navigate };
}
