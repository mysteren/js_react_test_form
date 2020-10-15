/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './BaseInput.css';

const BaseInput = ({ label, name, value, onChange, error }) => {
  const [focused, setFocused] = useState(false);
  // const [error, setError] = useState('');

  const handlerOnFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handlerOnBlure = useCallback(() => {
    setFocused(false);
  }, []);

  const handleInput = useCallback(
    (e) => {
      const val = e.target.value;
      onChange(name, val);
    },
    [name, onChange]
  );

  return (
    <div
      className={`inputContainer
        ${error ? 'inputContainer--show_error' : ''}
      `}
    >
      <label
        className={`inputContainer__label
          ${focused ? 'inputContainer__label--focus_true' : ''}
          ${value ? 'inputContainer__label--has_value' : ''}
        `}
      >
        {label}
      </label>
      <input
        type="text"
        className="inputContainer__input"
        onFocus={handlerOnFocus}
        onBlur={handlerOnBlure}
        onChange={handleInput}
        value={value}
      />
      {error && <div className="inputContainer__error">{error}</div>}
    </div>
  );
};

BaseInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  showError: PropTypes.bool,
  validator: PropTypes.func,
};

BaseInput.defaultProps = {
  label: '',
  value: null,
  showError: false,
  validator: null,
};

export default BaseInput;
