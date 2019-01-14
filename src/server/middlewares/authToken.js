import jwt from 'jsonwebtoken';
import dataResponse from '../helpers/dataResponse';

export default (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    return jwt.verify(token, process.env.SECRET_KEY, error => {
      if (error)
        return dataResponse.error(res, 401, 'Authentication failed. Token is invalid or expired');
      return next();
    });
  }
  return dataResponse.error(res, 403, 'Access denied. You are not logged in');
};
