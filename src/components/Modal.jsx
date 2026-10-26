import { useEffect, useRef } from 'react';
import { IconButton } from './IconButton.jsx';
import { X } from './icons.jsx';

export function Modal({ title, subtitle, children, onClose, drawer = false }) {
  const ref = useRef(null);
  const returnFocus = useRef(document.activeElement);
  useEffect(() => {
    const dialog = ref.current;
    const trigger = returnFocus.current;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      trigger?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={drawer ? 'dialog drawer' : 'dialog'}
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) {
          const r = ref.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-heading">
        <div>
          <p className="eyebrow">TU ESPACIO, A TU MANERA</p>
          <h2 id="dialog-title">{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <IconButton label="Cerrar panel" onClick={onClose}>
          <X size={22} />
        </IconButton>
      </div>
      {children}
    </dialog>
  );
}
