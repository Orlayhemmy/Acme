import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const { loginId, loginPassword } = data;

  const errors = {};

  if (validator.isEmpty(loginId)) {
    errors.loginId = 'email is required';
  }

  if (validator.isEmpty(loginPassword)) {
    errors.loginPassword = 'password is required';
  }

  return { errors, isValid: isEmpty(errors) };
}

