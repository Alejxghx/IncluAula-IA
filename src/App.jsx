import { HomeIntro } from './components/HomeIntro.jsx';
import { Sidebar, Topbar, MobileNav } from './components/Layout.jsx';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, MotionConfig, useReducedMotion } from 'framer-motion';
import {
  Accessibility,
  ArrowRight,
  BookOpen,
  Bookmark,
  Check,
  FileText,
  Home,
  Heart,
  Keyboard,
  Search,
  Sparkles,
} from './components/icons.jsx';
import { Modal } from './components/Modal.jsx';
import { Preferences } from './components/Preferences.jsx';
import { MaterialCard } from './components/MaterialCard.jsx';
import { materials } from './data/materials.js';
import { DEFAULTS, readSaved, initialPrefs } from './preferences.js';
import { useNavigation } from './hooks/useNavigation.js';

export default function App() {
  const [prefs, setPrefs] = useState(initialPrefs);
  const [saved, setSaved] = useState(() => {
    const value = readSaved('incluaula.saved.v1', []);
    return Array.isArray(value) ? value.filter((id) => materials.some((m) => m.id === id)) : [];
  });
  const mainRef = useRef(null);
  const { page, navigate } = useNavigation(mainRef);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [notice, setNotice] = useState('');
  const [storageFailed, setStorageFailed] = useState(false);
  const systemReduced = useReducedMotion();
  const reduced = prefs.reducedMotion || systemReduced;
  useEffect(() => {
    document.documentElement.dataset.theme = prefs.theme;
    document.documentElement.style.setProperty('--font-scale', prefs.size / 100);
    document.documentElement.dataset.spacing = String(prefs.spacing);
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
    document.documentElement.dataset.focus = String(prefs.focus);
    try {
      localStorage.setItem('incluaula.preferences.v1', JSON.stringify(prefs));
    } catch {
      setStorageFailed(true);
    }
  }, [prefs, reduced]);
  useEffect(() => {
    try {
      localStorage.setItem('incluaula.saved.v1', JSON.stringify(saved));
    } catch {
      setStorageFailed(true);
    }
  }, [saved]);
  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => setNotice(''), 3500);
      return () => clearTimeout(timer);
    }
  }, [notice]);
  const update = (key, value) => setPrefs((p) => ({ ...p, [key]: value }));
  useEffect(() => {
    setQuery('');
    setFilter('Todos');
  }, [page]);
  function toggleSave(id) {
    const exists = saved.includes(id);
    setSaved((p) => (exists ? p.filter((x) => x !== id) : [...p, id]));
    setNotice(exists ? 'Material eliminado de guardados.' : 'Material añadido a guardados.');
  }
  const visible = materials.filter(
    (m) =>
      (page !== 'saved' || saved.includes(m.id)) &&
      (filter === 'Todos' || m.kind === filter) &&
      `${m.title} ${m.subject}`
        .toLocaleLowerCase('es')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(
          query
            .toLocaleLowerCase('es')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''),
        ),
  );
  const openDetails = (m) => {
    setSelected(m);
    setModal('material');
  };
  const nav = [
    { id: 'home', label: 'Mi inicio', icon: Home },
    { id: 'library', label: 'Biblioteca', icon: BookOpen },
    { id: 'saved', label: 'Guardados', icon: Bookmark },
  ];
  return (
    <MotionConfig
      reducedMotion={reduced ? 'always' : 'never'}
      transition={{ duration: reduced ? 0 : 0.25 }}
    >
      <a className="skip-link" href="#main">
        Saltar al contenido principal
      </a>
      <Sidebar nav={nav} page={page} saved={saved} setModal={setModal} />
      <div className="app-shell">
        <Topbar nav={nav} page={page} setModal={setModal} />
        <MobileNav nav={nav} page={page} setModal={setModal} />
        <main id="main" tabIndex={-1} ref={mainRef}>
          <div className="page-heading">
            <div>
              <p className="eyebrow">
                <span className="small-dot" /> UN ESPACIO PARA TODAS LAS PERSONAS
              </p>
              <h1>
                {page === 'home'
                  ? 'Tu forma de aprender importa.'
                  : page === 'library'
                    ? 'Un mundo por descubrir.'
                    : 'Tus próximos descubrimientos.'}
              </h1>
              <p>
                {page === 'home'
                  ? 'Explora, descubre y aprende a tu ritmo. Este espacio se adapta a ti.'
                  : page === 'library'
                    ? 'Explora la biblioteca de ejemplo y encuentra lo que te interesa.'
                    : 'Reúne en un solo lugar los materiales que te interesan.'}
              </p>
            </div>
            <span className="welcome-mark" aria-hidden="true">
              <Sparkles size={24} />
            </span>
          </div>
          {page === 'home' && (
            <HomeIntro
              prefs={prefs}
              reduced={reduced}
              navigate={navigate}
              update={update}
              setModal={setModal}
            />
          )}
          <section className="materials-section" aria-labelledby="materials-title">
            <div className="section-heading">
              <div>
                <div className="section-title-row">
                  <h2 id="materials-title">
                    {page === 'home'
                      ? 'Un poco de inspiración'
                      : page === 'library'
                        ? 'Biblioteca de materiales'
                        : 'Materiales guardados'}
                  </h2>
                  <span className="count-badge">
                    {page === 'home' ? materials.length : visible.length}
                  </span>
                </div>
                <p>
                  {page === 'home'
                    ? 'Cada tema es una nueva puerta. ¿Cuál quieres abrir hoy?'
                    : 'Tarjetas de muestra para explorar y personalizar la interfaz.'}
                </p>
              </div>
              {page === 'home' && (
                <button className="text-button view-all" onClick={() => navigate('library')}>
                  Ver biblioteca <ArrowRight size={16} />
                </button>
              )}
            </div>
            {page !== 'home' && (
              <div className="library-controls">
                <div className="search-field">
                  <Search size={18} />
                  <input
                    aria-label="Buscar materiales por título o asignatura"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Busca un tema o asignatura…"
                  />
                </div>
                <div className="filter-group" role="group" aria-label="Filtrar por tipo">
                  {['Todos', 'Lectura', 'Video', 'Actividad'].map((f) => (
                    <button
                      key={f}
                      aria-pressed={filter === f}
                      className={filter === f ? 'selected' : ''}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {page !== 'home' && (
              <p className="result-count" role="status">
                {visible.length}{' '}
                {visible.length === 1 ? 'material encontrado' : 'materiales encontrados'}
              </p>
            )}
            <div className="material-grid">
              {visible.map((m, i) => (
                <MaterialCard
                  key={m.id}
                  material={m}
                  index={i}
                  reduced={reduced}
                  saved={saved.includes(m.id)}
                  toggleSave={toggleSave}
                  onOpen={openDetails}
                />
              ))}
            </div>
            {!visible.length && (
              <div className="empty-state">
                <Bookmark size={32} />
                <h3>
                  {page === 'saved' && !saved.length
                    ? 'Tu colección empieza aquí'
                    : 'No encontramos ese material'}
                </h3>
                <p>
                  {page === 'saved' && !saved.length
                    ? 'Usa el marcador de una tarjeta para guardarla en este espacio.'
                    : 'Prueba con otro tema o cambia los filtros.'}
                </p>
                <button
                  className="button primary"
                  onClick={() =>
                    page === 'saved' && !saved.length
                      ? navigate('library')
                      : (setQuery(''), setFilter('Todos'))
                  }
                >
                  {page === 'saved' && !saved.length ? 'Explorar biblioteca' : 'Limpiar búsqueda'}
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
            <div className="example-note">
              <FileText size={14} />
              <span>
                Contenido de ejemplo para explorar la interfaz. Las lecciones se integrarán más
                adelante.
              </span>
            </div>
          </section>
          {page === 'home' && (
            <section className="keyboard-banner">
              <span className="keyboard-icon">
                <Keyboard size={25} />
              </span>
              <div>
                <h2>También puedes llegar a todo con tu teclado.</h2>
                <p>
                  Muévete con <kbd>Tab</kbd>, selecciona con <kbd>Enter</kbd> y sigue aprendiendo a
                  tu manera.
                </p>
              </div>
              <button className="text-button" onClick={() => setModal('help')}>
                Ver guía <ArrowRight size={17} />
              </button>
            </section>
          )}
          <footer>
            <span className="footer-brand">
              <BookOpen size={16} /> IncluAula IA
            </span>
            <p>La educación es mejor cuando cabemos todos.</p>
            <span className="footer-heart">
              <Heart size={13} /> Hecho para incluir
            </span>
          </footer>
        </main>
      </div>
      <div className="sr-only" role="status" aria-live="polite">
        {notice}
      </div>
      <AnimatePresence>
        {notice && (
          <m.div
            className="toast"
            aria-hidden="true"
            initial={{ opacity: 0, y: reduced ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Check size={17} />
            {notice}
          </m.div>
        )}
      </AnimatePresence>
      {storageFailed && (
        <div className="storage-warning" role="status">
          El navegador no permite guardar preferencias. Se aplicarán durante esta visita.
        </div>
      )}
      {modal === 'preferences' && (
        <Preferences
          prefs={prefs}
          update={update}
          systemReduced={systemReduced}
          reset={() => {
            setPrefs({ ...DEFAULTS });
            setNotice('Preferencias restablecidas.');
          }}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'help' && (
        <Modal
          title="Un teclado, todas las posibilidades"
          subtitle="Usa los controles a tu ritmo, sin necesidad de un ratón."
          onClose={() => setModal(null)}
        >
          <div className="help-content">
            {[
              ['Tab', 'Ir al siguiente enlace o control'],
              ['Shift + Tab', 'Volver al control anterior'],
              ['Enter', 'Activar enlaces y botones'],
              ['Espacio', 'Activar botones e interruptores'],
              ['← / → / ↑ / ↓', 'Cambiar opciones dentro de un grupo'],
              ['Esc', 'Cerrar este panel y volver al control anterior'],
            ].map(([key, text]) => (
              <div className="key-row" key={key}>
                <kbd>{key}</kbd>
                <span>{text}</span>
              </div>
            ))}
            <div className="help-note">
              <Accessibility size={22} />
              <p>
                Al empezar a navegar, encontrarás «Saltar al contenido principal». El borde de
                enfoque te indica dónde estás.
              </p>
            </div>
            <button className="button primary" onClick={() => setModal(null)}>
              Entendido <Check size={17} />
            </button>
          </div>
        </Modal>
      )}
      {modal === 'material' && selected && (
        <Modal title={selected.title} subtitle={selected.subject} onClose={() => setModal(null)}>
          <div className="material-detail">
            <span className="sample-badge">Material de ejemplo</span>
            <p>{selected.description}</p>
            <div className="detail-tags">
              {selected.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="help-note">
              <BookOpen size={22} />
              <p>
                Esta tarjeta muestra el diseño de la biblioteca. El contenido de la lección todavía
                no está disponible.
              </p>
            </div>
            <button
              className="button primary"
              aria-pressed={saved.includes(selected.id)}
              onClick={() => toggleSave(selected.id)}
            >
              <Bookmark size={18} />
              Guardar material
            </button>
          </div>
        </Modal>
      )}
    </MotionConfig>
  );
}
