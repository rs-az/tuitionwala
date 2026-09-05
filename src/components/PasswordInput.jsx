import { useState } from 'react';
import './PasswordInput.css';

const PasswordInput = ({
  id,
  name = 'password',
  value,
  onChange,
  placeholder,
  required,
  autoComplete = 'current-password',
  variant = 'light',
  minLength,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`password-input password-input--${variant}`}>
      <input
        id={id}
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        <i className={`fas ${show ? 'fa-eye-slash' : 'fa-eye'}`}></i>
      </button>
    </div>
  );
};

export default PasswordInput;
