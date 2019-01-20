import { SignIn } from '../../../components/user/SignIn';

describe('<SignIn />', () => {
  const setUp = () => {
    const props = {
      history: {
        push: jest.fn()
      },
      user: {
        generalError: '',
        isAuthenticated: false,
        isProcessing: false
      },
      actions: {
        userLogin: jest.fn(() => Promise.resolve())
      }
    };
    const state = {
      email: '',
      password: '',
      errors: {}
    };
    return {
      wrapper: shallow(<SignIn {...props} />),
      props,
      state
    };
  };

  const event = {
    target: {
      email: 'mail@gmail.com',
      pasword: 'password'
    },
    preventDefault: jest.fn(),
    persist: jest.fn()
  };

  it('render without crashing', () => {
    const { wrapper } = setUp();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('invokes handleChange method', () => {
    const { wrapper } = setUp();
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it('invokes handleSubmit method', () => {
    const { wrapper } = setUp();
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should signin user when all validations are met', () => {
    const { wrapper, state } = setUp();

    wrapper.setState({
      ...state,
      email: 'mail@gmail.com',
      password: 'password'
    });
    wrapper.find('button').simulate('click', event);

    expect(wrapper.instance().state.errors).toEqual({});
  });

  it('should not signin user when username or password is fails authentication', () => {
    const { wrapper, state, props } = setUp();

    wrapper.setState({
      ...state,
      email: '123456',
      password: 'password'
    });

    wrapper.setProps({
      ...props,
      generalError: 'email or passowrd is invalid'
    });
    wrapper.find('button').simulate('click', event);

    expect(wrapper.instance().state.errors).toEqual({});
  });
});
