/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './BaseInput.css';

const BaseInput = ({ label, name, value, onChange, showError, validator }) => {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(validator ? validator(value) : '');

  const handlerOnFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handlerOnBlure = useCallback(() => {
    setFocused(false);
  }, []);

  const handleInput = useCallback(
    (e) => {
      const val = e.target.value;
      setError(validator ? validator(val) : '');
      onChange(name, val, error);
    },
    [name, onChange, validator, error]
  );

  return (
    <div
      className={`inputContainer
        ${showError ? 'inputContainer--show_error' : ''}
      `}
    >
      <label
        className={`inputContainer__label
          ${focused || value ? 'inputContainer__label--focus_true' : ''}
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
      {showError && <div className="inputContainer__error">{error}</div>}
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
