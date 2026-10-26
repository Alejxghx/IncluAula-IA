import { m } from 'framer-motion';
import { Sprout, Video, FileText, Bookmark } from './icons.jsx';

export function MaterialCard({ material, saved, toggleSave, onOpen, index, reduced }) {
  const Icon = material.icon;
  return (
    <m.article
      className="material-card"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.25, delay: reduced ? 0 : index * 0.045 }}
    >
      <div className={`card-art ${material.color}`}>
        <div className="art-pattern" />
        <div className="subject-art" aria-hidden="true">
          <Icon strokeWidth={1.2} />
          {material.id === 'ecosistemas' && <Sprout className="second-leaf" strokeWidth={1.2} />}
        </div>
        <span className="kind-label">
          {material.kind === 'Video' ? <Video size={13} /> : <FileText size={13} />} {material.kind}
        </span>
        <button
          className={`save-button ${saved ? 'is-saved' : ''}`}
          aria-label={`Guardar material: ${material.title}`}
          aria-pressed={saved}
          onClick={() => toggleSave(material.id)}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="card-content">
        <p className="subject-label">{material.subject}</p>
        <h3>
          <button onClick={() => onOpen(material)}>{material.title}</button>
        </h3>
        <div className="card-meta">
          <span>{material.time} de referencia</span>
          <span className="sample-badge">Ejemplo</span>
        </div>
      </div>
    </m.article>
  );
}
