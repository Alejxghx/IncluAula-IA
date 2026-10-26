import {
  BookOpen,
  SlidersHorizontal,
  CircleHelp,
  Heart,
  ChevronRight,
  GraduationCap,
} from './icons.jsx';
import { PAGE_HASH } from '../hooks/useNavigation.js';

export function Sidebar({ nav, page, saved, setModal }) {
  return (
    <>
      <aside className="sidebar" aria-label="Barra lateral">
        <a className="brand" href="#/inicio" aria-label="IncluAula IA, inicio">
          <span className="brand-icon">
            <BookOpen size={25} />
          </span>
          <span>
            IncluAula <span className="brand-ai">IA</span>
          </span>
        </a>
        <div className="workspace-label">
          <span className="small-dot" /> TU ESPACIO DE APRENDIZAJE
        </div>
        <nav aria-label="Navegación principal">
          <p className="nav-label">APRENDER</p>
          {nav.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={PAGE_HASH[id]}
              className={`nav-item ${page === id ? 'active' : ''}`}
              aria-current={page === id ? 'page' : undefined}
            >
              <Icon size={20} />
              <span>{label}</span>
              {id === 'saved' && saved.length > 0 && (
                <span className="nav-count">{saved.length}</span>
              )}
              {page === id && <span className="active-dot" />}
            </a>
          ))}
          <p className="nav-label personal-label">A TU MANERA</p>
          <button className="nav-item" onClick={() => setModal('preferences')}>
            <SlidersHorizontal size={20} />
            <span>Preferencias</span>
          </button>
          <button className="nav-item" onClick={() => setModal('help')}>
            <CircleHelp size={20} />
            <span>Ayuda y teclado</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="inclusion-note">
            <span className="inclusion-icon">
              <Heart size={19} />
            </span>
            <h3>
              Diferentes formas.
              <br />
              Las mismas oportunidades.
            </h3>
            <p>Aquí, cada forma de aprender tiene su lugar.</p>
            <span className="note-decoration" aria-hidden="true">
              ✳
            </span>
          </div>
          <div className="sidebar-signature">
            <span className="small-dot" /> Diseñado para incluir
          </div>
        </div>
      </aside>
    </>
  );
}

export function Topbar({ nav, page, setModal }) {
  return (
    <>
      <header className="topbar">
        <div className="breadcrumb">
          <span>Mi espacio</span>
          <ChevronRight size={14} />
          <strong>{nav.find((n) => n.id === page).label}</strong>
        </div>
        <a className="mobile-brand" href="#/inicio">
          <BookOpen size={24} /> IncluAula IA
        </a>
        <div className="topbar-actions">
          <button
            aria-label="Accesibilidad"
            className="preferences-trigger"
            onClick={() => setModal('preferences')}
          >
            <SlidersHorizontal size={17} />
            <span>Accesibilidad</span>
            <span className="shortcut-dot" />
          </button>
          <span className="profile-avatar" role="img" aria-label="Espacio de estudiante">
            <GraduationCap size={21} />
          </span>
        </div>
      </header>
    </>
  );
}

export function MobileNav({ nav, page, setModal }) {
  return (
    <>
      <nav className="mobile-nav" aria-label="Navegación móvil">
        {nav.map(({ id, label, icon: Icon }) => (
          <a key={id} href={PAGE_HASH[id]} aria-current={page === id ? 'page' : undefined}>
            <Icon size={18} />
            {label}
          </a>
        ))}
        <button onClick={() => setModal('help')}>
          <CircleHelp size={18} />
          Ayuda
        </button>
      </nav>
    </>
  );
}
