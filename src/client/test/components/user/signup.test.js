import { SignUp } from '../../../components/user/SignUp';

describe('<SignUp />', () => {
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
        userSignup: jest.fn(() => Promise.resolve())
      }
    };
    const state = {
      email: '',
      password: '',
      username: '',
      errors: {}
    };
    return {
      wrapper: shallow(<SignUp {...props} />),
      props,
      state
    };
  };

  const event = {
    target: {
      email: 'mail@gmail.com',
      pasword: 'password',
      username: 'mailer'
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
      password: 'password',
      username: 'mailer'
    });
    wrapper.find('button').simulate('click', event);

    expect(wrapper.instance().state.errors).toEqual({});
  });
});
