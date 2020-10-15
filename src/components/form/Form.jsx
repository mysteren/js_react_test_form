import React, { useReducer } from 'react';
import { cloneDeep } from 'lodash-es';
import Input from '../Input/Input';
import { requireValidator, phoneValidator, emailValidator } from './validators';
import './Form.scss';

const genders = [
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
];

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
    phone: phoneValidator(''),
    email: emailValidator('', false),
    birthdate: requireValidator(''),
    address: '',
    employer: '',
  },
  sending: false,
  showErrors: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  const newState = cloneDeep(state);
  switch (type) {
    case 'setFormParam':
      newState.formData[payload.key] = payload.value;
      newState.formErrors[payload.key] = payload.error;
      return newState;
    case 'setSengind':
      newState.sending = payload;
      return newState;
    case 'refreshFormData':
      return initialState;
    case 'showErrors':
      newState.showErrors = true;
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
  const { formData, formErrors, sending, showErrors } = state;
  // const [showErrors, setShowErrors] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showErrors) {
      dispatch({ type: 'showErrors' });
    }
    if (!sending) {
      if (!isErrors(formErrors)) {
        dispatch({ type: 'setSengind', payload: true });
        setTimeout(() => {
          dispatch({ type: 'refreshFormData' });
          // dispatch({ type: 'setSengind', payload: false });
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
      case 'phone':
        error = phoneValidator(value);
        break;
      case 'email':
        error = emailValidator(value, false);
        break;
      case 'birthdate':
        error = requireValidator(value, false);
        break;
      default:
        break;
    }
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
        <Input
          label="Фамилия"
          name="surname"
          value={formData.surname}
          error={showErrors ? formErrors.surname : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem2">
        <Input
          label="Имя"
          name="name"
          value={formData.name}
          error={showErrors ? formErrors.name : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem3">
        <Input
          label="Отчество"
          name="patronymic"
          value={formData.patronymic}
          error={showErrors ? formErrors.patronymic : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem4">
        <Input
          label="Пол"
          type="select"
          options={genders}
          name="gender"
          value={formData.gender}
          error={showErrors ? formErrors.gender : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem5">
        <Input
          label="Дата рождения"
          type="date"
          name="birthdate"
          value={formData.birthdate}
          error={showErrors ? formErrors.birthdate : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem6">
        <Input
          label="Мобильный телефон"
          type="phone"
          name="phone"
          value={formData.phone}
          error={showErrors ? formErrors.phone : ''}
          onChange={handleChangeInput}
        >
          <p>asdasdas</p>
        </Input>
      </div>
      <div className="form__group form__gridItem7">
        <Input
          label="Email (необязательно)"
          name="email"
          value={formData.email}
          error={showErrors ? formErrors.email : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem8">
        <Input
          label="Адрес постоянно регистрации"
          name="address"
          value={formData.address}
          error={showErrors ? formErrors.address : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem9">
        <Input
          label="Название роботодателя"
          name="employer"
          value={formData.employer}
          error={showErrors ? formErrors.employer : ''}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form__group form__gridItem10">
        <button className="form__submitButton" type="submit">
          {sending ? 'Отправка ...' : 'Отправить'}
        </button>
      </div>
    </form>
  );
};

export default Form;
