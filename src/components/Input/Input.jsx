/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import { InputMask } from 'react-masked';
import PropTypes from 'prop-types';
import Select from '../Select/Select';
import './Input.scss';

const Input = ({ label, name, value, error, onChange, type, options }) => {
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

  const input = () => {
    switch (type) {
      case 'phone':
        return (
          <InputMask
            className={`inputContainer__input
              ${error ? 'inputContainer__input--has_error' : ''}
            `}
            onFocus={handlerOnFocus}
            onBlur={handlerOnBlure}
            onChange={handleInput}
            value={value}
            mask="+7 (999) 999-99-99"
          />
        );
      case 'select':
        return (
          <Select
            className="inputContainer__input"
            onFocus={handlerOnFocus}
            onBlur={handlerOnBlure}
            onChange={handleInput}
            value={value}
            options={options}
          />
        );
      case 'date':
        return (
          <input
            type={focused ? 'date' : 'text'}
            className={`inputContainer__input
            ${error ? 'inputContainer__input--has_error' : ''}
          `}
            onFocus={handlerOnFocus}
            onBlur={handlerOnBlure}
            onChange={handleInput}
            value={value}
          />
        );
      default:
        return (
          <input
            type={type}
            className={`inputContainer__input
              ${error ? 'inputContainer__input--has_error' : ''}
            `}
            onFocus={handlerOnFocus}
            onBlur={handlerOnBlure}
            onChange={handleInput}
            value={value}
          />
        );
    }
  };

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
      {input()}
      {error && <p className="inputContainer__error">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array,
};

Input.defaultProps = {
  type: 'text',
  label: '',
  value: null,
  error: '',
  options: [],
};

export default Input;
