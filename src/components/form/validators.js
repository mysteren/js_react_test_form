export const requireValidator = (value) => {
  if (value.trim() === '') {
    return 'Поле должно быть заполнено';
  }
  return '';
};

export const phoneValidator = (value, require = true) => {
  if (require) {
    const error = requireValidator(value);
    if (error) {
      return error;
    }
  } else if (!value) {
    return '';
  }

  const reg = /(\([0-9]{3}\)|[0-9]{3}-)[0-9]{2}-[0-9]{2}/;
  return reg.test(value) ? '' : 'Поле заполнено некорректно';
};

export const emailValidator = (value, require = true) => {
  if (require) {
    const error = requireValidator(value);
    if (error) {
      return error;
    }
  } else if (!value) {
    return '';
  }

  const reg = /\S+@\S+\.\S+/;
  return reg.test(value) ? '' : 'Поле заполнено некорректно';
};
