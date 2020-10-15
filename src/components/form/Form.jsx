import React, { useReducer, useState } from 'react';
import BaseInput from '../BaseInput/BaseInput';
import { requireValidator } from './validators';
import './Form.css';

const initialState = {
  formData: {
    name: '',
    surname: '',
    patronymic: '',
    gender: '',
    phone: '',
    email: '',
    birthdate: '',
    address: '',
    employer: '',
  },
  formErrors: {
    name: requireValidator(''),
    surname: requireValidator(''),
    patronymic: '',
    gender: '',
    phone: '',
    email: '',
    birthdate: '',
    address: '',
    employer: '',
  },
  sending: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  const newState = { ...state };
  switch (type) {
    case 'setFormParam':
      newState.formData[payload.key] = payload.value;
      newState.formErrors[payload.key] = payload.error;
      return newState;
    case 'setSengind':
      newState.sending = payload;
      return newState;
    default:
      return state;
  }
};

const isErrors = (errors) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [, value] of Object.entries(errors)) {
    if (value) {
      return true;
    }
  }
  return false;
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, formErrors, sending } = state;
  const [showErrors, setShowErrors] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showErrors) {
      setShowErrors(true);
    }
    if (!sending) {
      if (!isErrors(formErrors)) {
        dispatch({ type: 'setSengind', payload: true });
        setTimeout(() => {
          dispatch({ type: 'setSengind', payload: false });
          // eslint-disable-next-line no-alert
          alert(`Данные отправлены!' ${JSON.stringify(formData)}`);
        }, 1000);
      }
    }
  };

  const handleChangeInput = (key, value) => {
    let error;
    switch (key) {
      case 'surname':
        error = requireValidator(value);
        break;
      case 'name':
        error = requireValidator(value);
        break;
      default:
        break;
    }
    console.log(key, value, error);
    dispatch({
      type: 'setFormParam',
      payload: {
        key,
        value,
        error,
      },
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__group form__gridItem1">
        <BaseInput
          label="Фамилия"
          name="surname"
          value={formData.surname}
          error={showErrors ? formErrors.surname : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem2">
        <BaseInput
          label="Имя"
          name="name"
          value={formData.name}
          error={showErrors ? formErrors.name : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem3">
        <BaseInput
          label="Отчество"
          name="patronymic"
          value={formData.patronymic}
          error={showErrors ? formErrors.patronymic : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem4">
        {/* <BaseInput label="Дата рождения" /> */}
      </div>
      <div className="form__group form__gridItem5">
        {/* <BaseInput label="Пол" /> */}
      </div>
      <div className="form__group form__gridItem6">
        {/* <BaseInput label="Мобильный телефон" /> */}
      </div>
      <div className="form__group form__gridItem7">
        {/* <BaseInput label="Email" /> */}
      </div>
      <div className="form__group form__gridItem8">
        <BaseInput
          label="Адрес постоянно регистрации"
          name="address"
          value={formData.address}
          error={showErrors ? formErrors.address : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem9">
        <BaseInput
          label="Название роботодателя"
          name="employer"
          value={formData.employer}
          error={showErrors ? formErrors.employer : ''}
          onChange={handleChangeInput}
        />
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default Form;
