import { Header } from '../../../components/common/Header';

describe('<Header /> component', () => {
  const setUp = () => {
    const props = {
      history: {
        push: jest.fn()
      },
      actions: {
        userLogout: jest.fn(() => Promise.resolve())
      }
    };

    return {
      wrapper: shallow(<Header {...props} />),
      props
    };
  };

  const event = {
    preventDefault: jest.fn()
  };

  it('render without crashing', () => {
    const { wrapper } = setUp();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('invokes handleLogOut method', () => {
    const { wrapper } = setUp();
    const handleLogOutSpy = jest.spyOn(wrapper.instance(), 'handleLogOut');
    wrapper.instance().handleLogOut(event);
    expect(handleLogOutSpy).toHaveBeenCalled();
  });

  it('invokes handleLogOut method', () => {
    const { wrapper } = setUp();
    const handleLogOutSpy = jest.spyOn(wrapper.instance(), 'handleLogOut');
    wrapper.instance().handleLogOut(event);
    expect(handleLogOutSpy).toHaveBeenCalled();
  });
});
