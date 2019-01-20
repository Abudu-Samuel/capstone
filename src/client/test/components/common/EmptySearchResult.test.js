import EmptySearchReasult from '../../../components/common/EmptySearchResult';

describe('<NotFoundPage /> component', () => {
  const wrapper = shallow(<EmptySearchReasult />);

  it('renders the header component without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
