import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function createTestValidate(data) {
  const { classId, title } = data;
  const errors = {};
  if (validator.isEmpty(classId)) {
    errors.classId = 'Select a class';
  }
  if (!validator.isInt(classId)) {
    errors.classId = 'Select a class';
  }

  if (validator.isEmpty(title)) {
    errors.title = 'The test must have a title';
  }

  return { errors, isValid: isEmpty(errors) };
}

export function modifyTestValidate(data) {
  const { duration, intro, title } = data;
  const errors = {};
  if (validator.isEmpty(duration)) {
    errors.duration = 'Select a class';
  }
  if (!validator.isInt(duration)) {
    errors.duration = 'Select a class';
  }

  if (validator.isEmpty(title)) {
    errors.title = 'The test must have a title';
  }

  if (validator.isEmpty(intro)) {
    errors.title = 'The test must have an introduction';
  }

  return { errors, isValid: isEmpty(errors) };
}