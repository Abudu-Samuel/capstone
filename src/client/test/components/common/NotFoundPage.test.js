import NotFoundPage from '../../../components/common/NotFoundPage';

describe('<NotFoundPage /> component', () => {
  const wrapper = shallow(<NotFoundPage />);

  it('renders the header component without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
