import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

dotEnv.config();

export default (user, req, dataResponse, res, status, message) => {
  const payload = { id: user._id, email: user.email };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });

  req.token = token;

  dataResponse.success(res, status, message, token);
};
