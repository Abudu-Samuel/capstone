import { STATUS_CODES } from 'http';

export default {
  signUpResponse: {
    status: STATUS_CODES[201],
    message: 'Signup is successful',
    payload:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDIxNzk2YWQyOGRlOTc4NDk1NjM2NCIsImVtYWlsIjoidGVzdGVyQGdtYWlsLmNvbSIsImlhdCI6MTU0Nzk4OTk5MCwiZXhwIjoxNTQ3OTkzNTkwfQ._VQiPWxNmHNdCaW6AQopNokAFhDE5k6syNLNnu3UBt8'
  },
  loginResponse: {
    status: STATUS_CODES[200],
    message: 'Signin is successful',
    payload:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDIxNzk2YWQyOGRlOTc4NDk1NjM2NCIsImVtYWlsIjoidGVzdGVyQGdtYWlsLmNvbSIsImlhdCI6MTU0Nzk4OTk5MCwiZXhwIjoxNTQ3OTkzNTkwfQ._VQiPWxNmHNdCaW6AQopNokAFhDE5k6syNLNnu3UBt8'
  },
  loginData: {
    email: 'tester@gmail.com',
    password: 'password'
  },
  signupData: {
    email: 'testee@gmail.com',
    password: 'password',
    username: 'testee'
  },
  invalidLoginData: {
    email: 'invalid-email',
    password: 'pass123456'
  },
  authErrorResponse: {
    status: STATUS_CODES[400],
    message: 'Invalid email or password'
  },
  user: {
    exp: 1547993590,
    iat: 1547989990,
    id: '5c421796ad28de9784956364',
    email: 'tester@gmail.com'
  },
  cheatsResponse: {
    status: STATUS_CODES[200],
    message: 'Retrieved all categories with cheats',
    payload: []
  },
  cheatsErrorResponse: {
    status: STATUS_CODES[500],
    message: 'Oops!. An error occurred'
  }
};
