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
  let timer = duration.toString();
  if (validator.isEmpty(timer)) {
    errors.duration = 'Test must have duration';
  }
  if (!/^[0-9]+$/.test(timer)) {
    errors.duration = 'Specify duration in minutes. Numbers only';
  }

  if (validator.isEmpty(title)) {
    errors.title = 'The test must have a title';
  }

  if (validator.isEmpty(intro)) {
    errors.intro = 'The test must have an introduction';
  }

  return { errors, isValid: isEmpty(errors) };
}