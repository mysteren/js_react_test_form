/* eslint-disable import/prefer-default-export */
export const requireValidator = (value) => {
  if (value.trim() === '') {
    return 'Поле должно быть заполнено';
  }
  return '';
};
