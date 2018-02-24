import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function createNoteValidate(data) {
  const { classId, weekId } = data;
  const errors = {};

  if (validator.isEmpty(classId)) {
    errors.classId = 'Select a class';
  }

  if (validator.isEmpty(weekId)) {
    errors.weekId = 'Select a week';
  }

  return { errors, isValid: isEmpty(errors) };
}