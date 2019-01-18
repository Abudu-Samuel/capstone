export default {
  validData: {
    username: 'username',
    password: 'password',
    email: 'email@gmail.com'
  },
  emptyData: {
    username: '',
    password: '',
    confirmPassword: ''
  },
  invalidData: {
    username: '123456',
    password: 'ilove',
    email: 'ilove'
  },
  userLogin: { email: 'email@gmail.com', password: 'password' },
  emptyLoginData: { email: '', password: '' },
  invalidEmail: { email: 'wrongemail@gmail.com', password: 'password' },
  invalidPassword: { email: 'email@gmail.com', password: 'wordpass' }
};
