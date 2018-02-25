import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function setCurrentValidate(data) {
  const { weekId, termId } = data;
  const errors = {};

  if (!isEmpty(termId)) {
    if (!validator.isInt(termId)) {
      errors.termId = 'Select a term';
    }
  }

  if (!isEmpty(weekId)) {
    if (!validator.isInt(weekId)) {
      errors.weekId = 'Select a week';
    } 
  }
  return { errors, isValid: isEmpty(errors) };
}