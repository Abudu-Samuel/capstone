import User from '../models/UserModel';
import dataResponse from '../helpers/dataResponse';
import generateToken from '../helpers/generateToken';

export const userSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const foundUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });

    if (foundUser) {
      const message = {};
      if (foundUser.username === username.toLowerCase())
        message.username = 'Username is already taken';
      if (foundUser.email === email.toLowerCase()) message.email = 'Email already exist';

      return dataResponse.error(res, 409, message);
    }

    const newUser = new User();
    const hashedPassword = await newUser.generateHashedPassord(password);

    const createdUser = await newUser.set({ username, email, password: hashedPassword }).save();

    if (createdUser)
      return generateToken(createdUser, req, dataResponse, res, 201, 'Signup is successful');
    return dataResponse.error(res, 400, dataResponse.generalError);
  } catch (error) {
    return dataResponse.error(res, 500, dataResponse.internalError);
  }
};

export const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  const message = 'Invalid email or password';

  try {
    const foundUser = await User.findOne({ email: email.toLowerCase() });
    if (!foundUser) {
      return dataResponse.error(res, 400, message);
    }

    if (foundUser.email === email.toLowerCase()) {
      const newUserModel = new User();

      const isValidPassword = await newUserModel.validatePassword(password, foundUser.password);

      if (!isValidPassword) return dataResponse.error(res, 400, message);

      return generateToken(foundUser, req, dataResponse, res, 200, 'Signin is successful');
    }
    return dataResponse.error(res, 400, message);
  } catch (error) {
    return dataResponse.error(res, 500, error.message);
  }
};
