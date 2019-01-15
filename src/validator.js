import validator from 'validator';
import isEmpty from 'is-empty';

const validateUsername = username => {
  let error;

  if (!validator.isEmpty(username)) {
    if (!validator.toInt(username)) {
      if (!validator.isLength(username, { min: 3, max: 20 })) {
        error = 'Username must be at least 3 to 20 characters';
      }
    } else {
      error = 'Username must not start with a number';
    }
  } else {
    error = 'Username is required';
  }

  return error;
};

const validateEmail = (email, processId) => {
  let error;

  if (!validator.isEmpty(email)) {
    if (processId === 'signup') {
      if (!validator.isEmail(email)) {
        error = 'Email is invalid';
      }
    }
  } else {
    error = 'Email is required';
  }

  return error;
};

const validatePassword = (password, processId) => {
  let error;
  if (!validator.isEmpty(password)) {
    if (processId === 'signup') {
      if (!validator.isLength(password, { min: 6, max: 30 })) {
        error = 'Password length must be between 6 and 30';
      }
    }
  } else {
    error = 'Password is required';
  }

  return error;
};

export const signUpValidator = data => {
  const errors = {};

  const trimmedUsername = data.username.trim();
  const trimmedEmail = data.email.trim();
  const trimmedPassword = data.password.trim();

  const usernameError = validateUsername(trimmedUsername);
  const emailError = validateEmail(trimmedEmail, 'signup');
  const passwordError = validatePassword(trimmedPassword, 'signup');

  if (usernameError) errors.username = usernameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  const isValid = isEmpty(errors);
  return { errors, isValid };
};

export const signInValidator = data => {
  const errors = {};

  const trimmedEmail = data.email.trim();
  const trimmedPassword = data.password.trim();

  const emailError = validateEmail(trimmedEmail, 'signin');
  const passwordError = validatePassword(trimmedPassword, 'signin');

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  const isValid = isEmpty(errors);
  return { errors, isValid };
};
