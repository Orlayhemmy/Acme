import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function addQuestionValidate(data) {
  const { content, opt_a, opt_b, opt_c, opt_d, answer, point } = data;
  const errors = {};

  if (validator.isEmpty(content)) {
    errors.content = 'Question cannot be blank';
  }
  if (!validator.isInt(point)) {
    errors.point = 'point can only be a number';
  }

  if (validator.isEmpty(answer)) {
    errors.answer = 'Select the correct answer';
  }

  if (validator.isEmpty(opt_a)) {
    errors.opt_a = 'Option A cannot be blank';
  }
  
  if (validator.isEmpty(opt_b)) {
    errors.opt_b = 'Option B cannot be blank';
  }

  if (validator.isEmpty(opt_c)) {
    errors.opt_c = 'Option C cannot be blank';
  }

  if (validator.isEmpty(opt_d)) {
    errors.opt_d = 'Option D cannot be blank';
  }

  return { errors, isValid: isEmpty(errors) };
}