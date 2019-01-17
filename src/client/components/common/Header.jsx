import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import * as userActions from '../../actions/userActions';

const propTypes = {
  history: shape({}).isRequired,
  actions: shape({
    userLogout: func.isRequired
  }).isRequired
};

class Header extends Component {
  handleLogOut = event => {
    const { actions, history } = this.props;
    event.preventDefault();
    history.push('/');
    actions.userLogout();
  };

  render() {
    return (
      <div>
        {
          localStorage.getItem('x-access-token') ? (
            <nav className="navbar purple-gradient mb-5">
              <span className="navbar-text font-weight-bold white-text custom-text">Git cheat-sheet</span>
              <button className="btn btn-outline-white btn-sm my-0" onClick={this.handleLogOut}>
                Log out
            </button>
            </nav>
          ) : (
              <nav className="navbar purple-gradient mb-5">
                <span className="navbar-text font-weight-bold white-text custom-text">Git cheat-sheet</span>
              </nav>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

Header.propTypes = propTypes;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
