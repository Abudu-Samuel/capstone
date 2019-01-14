import { Router } from 'express';
import { signInValidations, signUpValidations } from '../middlewares/validations/userValidation';
import { userSignIn, userSignUp } from '../controllers/userController';

const router = Router();

router.post('/signup', signUpValidations, userSignUp);

router.post('/login', signInValidations, userSignIn);

export default router;
