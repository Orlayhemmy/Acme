import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function writeFeedbackValidate(data) {
  const { content } = data;
  const error = {};

  if (validator.isEmpty(content)) {
    error.content = 'Content cannot be blank';
  }

  return { errors, isValid: isEmpty(error) };
}