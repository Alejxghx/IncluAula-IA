import { useId } from 'react';

export function Switch({ label, description, checked, onChange, icon: Icon }) {
  const id = useId();
  return (
    <div className="switch-row">
      <Icon size={20} />
      <div>
        <span id={`${id}-label`}>{label}</span>
        <p id={`${id}-description`}>{description}</p>
      </div>
      <button
        className="switch"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-description`}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  );
}
