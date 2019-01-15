import dataResponse from '../../helpers/dataResponse';
import { signUpValidator, signInValidator } from '../../../validator';

export const signUpValidations = (req, res, next) => {
  const { errors, isValid } = signUpValidator(req.body);

  if (!isValid) return dataResponse.error(res, 400, errors);

  return next();
};

export const signInValidations = (req, res, next) => {
  const { errors, isValid } = signInValidator(req.body);

  if (!isValid) return dataResponse.error(res, 400, errors);

  return next();
};
