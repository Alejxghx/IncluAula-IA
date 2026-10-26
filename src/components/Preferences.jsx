import { Modal } from './Modal.jsx';
import { Switch } from './Switch.jsx';
import {
  ShieldCheck,
  Palette,
  Sun,
  Moon,
  Contrast,
  Check,
  Type,
  Sparkles,
  BookOpen,
  Keyboard,
} from './icons.jsx';

export function Preferences({ prefs, update, reset, onClose, systemReduced }) {
  return (
    <Modal
      title="Preferencias de accesibilidad"
      subtitle="Elige lo que te ayuda a aprender mejor."
      onClose={onClose}
      drawer
    >
      <div className="drawer-content">
        <div className="save-note">
          <ShieldCheck size={17} />
          <span>Se guardan en este navegador automáticamente.</span>
        </div>
        <fieldset>
          <legend>
            <Palette size={18} /> Apariencia
          </legend>
          <div className="theme-options">
            {[
              ['light', 'Claro', Sun],
              ['dark', 'Oscuro', Moon],
              ['contrast', 'Alto contraste', Contrast],
            ].map(([value, label, Icon]) => (
              <label
                className={`theme-option ${prefs.theme === value ? 'selected' : ''}`}
                key={value}
              >
                <input
                  type="radio"
                  name="theme"
                  value={value}
                  checked={prefs.theme === value}
                  onChange={() => update('theme', value)}
                />
                <span className={`theme-preview preview-${value}`}>
                  <span />
                  <span />
                  <span />
                </span>
                <span>
                  <Icon size={16} />
                  {label}
                </span>
                {prefs.theme === value && <Check size={15} className="choice-check" />}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <Type size={18} /> Tamaño del texto
          </legend>
          <div className="segmented">
            {[
              [100, 'Normal'],
              [112, 'Grande'],
              [125, 'Muy grande'],
            ].map(([size, label]) => (
              <label key={size} className={prefs.size === size ? 'selected' : ''}>
                <input
                  type="radio"
                  name="text-size"
                  checked={prefs.size === size}
                  onChange={() => update('size', size)}
                />
                <span>{label}</span>
                <small>{size}%</small>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="reading-preview">
          <span>VISTA PREVIA</span>
          <h3>Aprender también es descubrir.</h3>
          <p>Cada persona tiene su propio ritmo. Este espacio se adapta al tuyo.</p>
        </div>
        <div className="switches">
          <Switch
            icon={Type}
            label="Más espacio al leer"
            description="Aumenta el espacio entre letras y líneas."
            checked={prefs.spacing}
            onChange={(v) => update('spacing', v)}
          />
          <Switch
            icon={Sparkles}
            label="Reducir movimiento"
            description={
              systemReduced
                ? 'Tu sistema ya solicita reducir el movimiento.'
                : 'Evita animaciones y transiciones.'
            }
            checked={prefs.reducedMotion}
            onChange={(v) => update('reducedMotion', v)}
          />
          <Switch
            icon={BookOpen}
            label="Modo concentración"
            description="Oculta las ilustraciones decorativas."
            checked={prefs.focus}
            onChange={(v) => update('focus', v)}
          />
        </div>
        <div className="preference-tip">
          <Keyboard size={20} />
          <p>
            También puedes usar <kbd>Tab</kbd> para recorrer los controles y <kbd>Esc</kbd> para
            cerrar.
          </p>
        </div>
      </div>
      <div className="drawer-footer">
        <button className="text-button" onClick={reset}>
          Restablecer
        </button>
        <button className="button primary" onClick={onClose}>
          Listo <Check size={17} />
        </button>
      </div>
    </Modal>
  );
}
