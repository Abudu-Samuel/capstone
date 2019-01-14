import { Router } from 'express';
import { signInValidations, signUpValidations } from '../middlewares/validations/userValidation';
import { userSignIn, userSignUp } from '../controllers/userController';
import cheatController from '../controllers/cheatController';
import authToken from '../middlewares/authToken';

const router = Router();

router.post('/signup', signUpValidations, userSignUp);

router.post('/login', signInValidations, userSignIn);

router.get('/cheats', authToken, cheatController);

export default router;
