import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function createTestValidate(data) {
  const { classId, topic } = data;
  const errors = {};
  console.log(data);
  if (validator.isEmpty(classId)) {
    errors.classId = 'Select a class';
  }
  if (!validator.isInt(classId)) {
    errors.classId = 'Select a class';
  }

  if (validator.isEmpty(topic)) {
    errors.topic = 'The test must have a title';
  }

  return { errors, isValid: isEmpty(errors) };
}
