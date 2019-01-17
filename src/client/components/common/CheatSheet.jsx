/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import Masonry from 'react-masonry-component';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';
import EmptySearchResult from './EmptySearchResult';

class CheatSheet extends Component {

  state = {
    copied: false,
    commandId: '',
    keyword: ''
  }

  componentDidMount() {
    this.props.actions.fetchAllGitCheat();
  }

  handleCopy = commandId => {
    this.setState(prevState => ({
      ...prevState,
      copied: true,
      commandId
    }), () => setTimeout(() => {
      this.setState({
        copied: false
      })
    }, 900))
  };

  handleChange = event => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      keyword: event.target.value
    }), () => this.handleSearch()
    )
  };

  handleSearch = () => {
    const { keyword } = this.state;
    const { searchGitCheat } = this.props.actions
    searchGitCheat(keyword)
  }

  render() {
    const { user: { cheatSheets, searchData, isProcessing } } = this.props;
    const { copied, commandId } = this.state;
    const gitCheatData = searchData || cheatSheets;

    return (
      <Fragment>
        <form className="form-inline container-fluid col-md-4 offset-md-4">
          <div className="md-form form-md">
            <i className="fa fa-search prefix purple-text" />

            <input
              className="form-control form-control-md min-wid"
              type="text"
              name="keyword"
              onChange={this.handleChange}
              placeholder="Search" aria-label="Search" />
          </div>
        </form>

        <div className="container">
          <Masonry className="card-columns">
            {
              Object.keys(gitCheatData).length < 1 && !isProcessing ? <EmptySearchResult /> :
                gitCheatData.map(cheatSheet => {
                  return <div className="col-md-4 mb-2" key={cheatSheet._id}>
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title title">{cheatSheet.name.toUpperCase()}</h4>
                        {
                          cheatSheet.cheats.map(cheat => {
                            return <div key={cheat._id}>
                              <p className="card-text font-weight-bold black-text">{cheat.description}</p>
                              {' '}
                              {copied && commandId === cheat._id ? <span className="purple-text">text copied</span> : null}

                              <CopyToClipboard text={cheat.command} onCopy={() => this.handleCopy(cheat._id)}>
                                <p className="command-text">$ {cheat.command}</p>
                              </CopyToClipboard>
                            </div>
                          })
                        }
                      </div>
                    </div>
                  </div>
                })
            }
          </Masonry>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheatSheet);
