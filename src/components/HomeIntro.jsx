import { m } from 'framer-motion';
import {
  ArrowRight,
  Type,
  AudioLines,
  Accessibility,
  BookOpen,
  Check,
  Settings2,
  Contrast,
} from './icons.jsx';

export function HomeIntro({ prefs, reduced, navigate, update, setModal }) {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="hero-kicker">
            <span /> APRENDER SIN BARRERAS
          </span>
          <h2 id="hero-title">
            Un aula con espacio
            <br />
            para <em>cada mente.</em>
          </h2>
          <p>
            No hay una sola manera de aprender.
            <br />
            Encuentra la tuya, nosotros te acompañamos.
          </p>
          <button className="button hero-button" onClick={() => navigate('library')}>
            Explorar materiales <ArrowRight size={18} />
          </button>
          <div className="hero-bottom">
            <span className="tiny-avatars" aria-hidden="true">
              <span>✦</span>
              <span>◎</span>
              <span>✳</span>
            </span>
            <span>Distintos ritmos. Un mismo lugar.</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-star star-one">✳</div>
          <div className="art-star star-two">✦</div>
          <div className="floating-tile tile-type">
            <Type size={30} />
          </div>
          <div className="floating-tile tile-audio">
            <AudioLines size={27} />
          </div>
          <div className="floating-tile tile-access">
            <Accessibility size={29} />
          </div>
          <m.div
            className="hero-book"
            initial={false}
            animate={{ rotate: prefs.focus || reduced ? 0 : -8 }}
          >
            <div className="book-spine" />
            <BookOpen strokeWidth={1.1} />
            <span className="book-spark">✦</span>
            <div className="book-lines">
              <i />
              <i />
              <i />
            </div>
          </m.div>
          <div className="floating-caption">
            <span>
              <Check size={13} />
            </span>{' '}
            A tu ritmo, a tu manera
          </div>
        </div>
      </section>
      <section className="comfort-bar" aria-label="Preferencias rápidas">
        <div className="comfort-title">
          <span>
            <Settings2 size={21} />
          </span>
          <div>
            <h2>Ponte a gusto</h2>
            <p>Tu experiencia, tus preferencias.</p>
          </div>
        </div>
        <div className="quick-options">
          <button
            onClick={() =>
              update('size', prefs.size === 125 ? 100 : prefs.size === 100 ? 112 : 125)
            }
          >
            <Type size={19} />
            <span>
              Texto{' '}
              <strong>
                {prefs.size === 100 ? 'normal' : prefs.size === 112 ? 'grande' : 'muy grande'}
              </strong>
            </span>
          </button>
          <button
            aria-pressed={prefs.theme === 'contrast'}
            onClick={() => update('theme', prefs.theme === 'contrast' ? 'light' : 'contrast')}
          >
            <Contrast size={19} />
            <span>Alto contraste</span>
            <span className={`mini-switch ${prefs.theme === 'contrast' ? 'on' : ''}`} />
          </button>
          <button className="all-settings" onClick={() => setModal('preferences')}>
            Personalizar <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
}
