import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function createAssignmentValidate(data) {
  const { classId, weekId, topic } = data;
  const errors = {};

  if (validator.isEmpty(classId)) {
    errors.classId = 'Select a class';
  }
  if (!validator.isInt(classId)) {
    errors.classId = 'Select a class';
  }

  if (validator.isEmpty(weekId)) {
    errors.weekId = 'Select a week';
  }
  if (!validator.isInt(weekId)) {
    errors.weekId = 'Select a week';
  }

  if (validator.isEmpty(topic)) {
    errors.topic = 'The assignment must have a topic';
  }

  return { errors, isValid: isEmpty(errors) };
}

export function writeAssignmentValidate(data) {
  const { topic, content } = data;
  const errors = {};
  
  if (validator.isEmpty(topic)) {
    errors.topic = 'Assignment must have a topic';
  }

  if (validator.isEmpty(content)) {
    errors.content = 'Content cannot be blank';
  }

  return { errors, isValid: isEmpty(errors) };
}
