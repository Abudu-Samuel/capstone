import { CheatSheet } from '../../../components/common/CheatSheet';

describe('<CheatSheet /> component', () => {
  const setUp = () => {
    const props = {
      isProcessing: false,
      user: {
        cheatSheets: [
          {
            name: 'Install Git',
            cheats: [{}]
          }
        ]
      },
      actions: {
        fetchAllGitCheat: jest.fn(() => Promise.resolve()),
        searchGitCheat: jest.fn()
      }
    };
    const state = {
      copied: false,
      commandId: '',
      keyword: ''
    };
    return {
      wrapper: shallow(<CheatSheet {...props} />),
      state,
      props
    };
  };
  const event = {
    target: {
      keyword: 'testing'
    },
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

  it('invokes handleCopy method', () => {
    const { wrapper } = setUp();
    const handleCopySpy = jest.spyOn(wrapper.instance(), 'handleCopy');
    wrapper.instance().handleCopy('324553');
    expect(handleCopySpy).toHaveBeenCalled();
  });
});
