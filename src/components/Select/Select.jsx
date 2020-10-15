/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Select.scss';

const Select = ({ value, options, className, onChange, onFocus, onBlur }) => {
  const [showOptions, setShowOptions] = useState(false);
  const wrapperElemenet = useRef(null);
  const handleOptionClick = (e) => {
    onChange({
      target: {
        value: e.target.getAttribute('data-value'),
      },
    });
  };

  const handleClickOutside = (e) => {
    if (wrapperElemenet && !wrapperElemenet.current.contains(e.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (showOptions) {
      onFocus();
    } else {
      onBlur();
    }
  }, [showOptions, onFocus, onBlur]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleToggle = () => {
    setShowOptions(!showOptions);
  };

  const selected = options.find((option) => option.value === value);

  return (
    <div
      className={`select ${className}`}
      onClick={handleToggle}
      ref={wrapperElemenet}
    >
      <div className="select__selected">{selected ? selected.label : ''}</div>
      <div
        className={`select__options
          ${showOptions ? 'select__options--show_true' : ''}
          `}
      >
        {options.map((option) => {
          return (
            <div
              key={option.value}
              className="select__option"
              data-value={option.value}
              onClick={handleOptionClick}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Select.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

Select.defaultProps = {
  value: '',
  className: '',
  options: [],
};

export default Select;
