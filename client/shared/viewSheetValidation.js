import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function viewSheetValidate(data) {
  const { classId, typeId } = data;
  const errors = {};

  if (validator.isEmpty(classId)) {
    errors.classId = 'Select a class';
  }
  if (validator.isEmpty(typeId)) {
    errors.typeId = 'Select Type';
  }
  return { errors, isValid: isEmpty(errors) };
}