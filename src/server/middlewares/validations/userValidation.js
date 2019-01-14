import validator from 'validator';
import isEmpty from 'is-empty';
import dataResponse from '../../helpers/dataResponse';

const validateUndefinedData = data => {
  let message = '';
  let counter = 0;

  if (data.isUsernameUndefined || data.isEmailUndefined || data.isPasswordUndefined) {
    if (data.isUsernameUndefined) {
      message += 'username, ';
      counter += 1;
    }

    if (data.isEmailUndefined) {
      message += 'email, ';
      counter += 1;
    }

    if (data.isPasswordUndefined) {
      message += 'password, ';
      counter += 1;
    }

    if (counter > 1) message += 'are not defined';
    else message += 'is not defined';
  }

  const index = message.lastIndexOf(',');
  message = message.substring(0, index) + message.substring(index + 1);

  return message;
};

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

export const signUpValidations = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = {};

  const isUsernameUndefined = typeof username === 'undefined';
  const isEmailUndefined = typeof email === 'undefined';
  const isPasswordUndefined = typeof password === 'undefined';

  const message = validateUndefinedData({
    isUsernameUndefined,
    isEmailUndefined,
    isPasswordUndefined
  });

  if (message) return dataResponse.error(res, 422, message);

  const trimmedUsername = username.trim();
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const usernameError = validateUsername(trimmedUsername);
  const emailError = validateEmail(trimmedEmail, 'signup');
  const passwordError = validatePassword(trimmedPassword, 'signup');

  if (usernameError) errors.username = usernameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  if (!isEmpty(errors)) {
    return dataResponse.error(res, 400, errors);
  }
  return next();
};

export const signInValidations = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  const isEmailUndefined = typeof email === 'undefined';
  const isPasswordUndefined = typeof password === 'undefined';

  const message = validateUndefinedData({ isEmailUndefined, isPasswordUndefined });

  if (message) return dataResponse.error(res, 422, message);

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const emailError = validateEmail(trimmedEmail, 'signin');
  const passwordError = validatePassword(trimmedPassword, 'signin');

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  if (!isEmpty(errors)) {
    return dataResponse.error(res, 400, errors);
  }
  return next();
};
