import React, { Fragment, Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';
import { signInValidator } from '../../../validator';

const propTypes = {
  history: shape({}).isRequired,
  user: shape({}).isRequired,
  actions: shape({
    userLogin: func.isRequired
  }).isRequired
};

export class SignIn extends Component {
  initialState = {
    email: '',
    password: '',
    errors: {}
  };

  state = {
    ...this.initialState
  };

  handleChange = event => {
    event.persist();

    this.setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { actions, history } = this.props;
    const { errors, isValid } = signInValidator(this.state);

    if (!isValid) {
      this.setState(prevState => ({
        ...prevState,
        errors
      }));
    } else {
      actions.userLogin(this.state).then(() => {
        const { user } = this.props;
        if (!user.generalError) history.push('/cheat-sheet');
      });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <Fragment>
        <div className="row">
          <div className="card col-md-4 offset-md-4 mt-5">
            <div className="card-body">
              <form>
                <p className="h4 text-center py-4">Sign in</p>

                <div className="md-form down">
                  <i className="fa fa-envelope prefix purple-text" />
                  <input
                    type="text"
                    name="email"
                    id="materialFormCardEmailEx"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                  {errors.email && (
                    <span className="field-error d-flex justify-content-end">{errors.email}</span>
                  )}
                  <label htmlFor="materialFormCardEmailEx" className="font-weight-light">Your email</label>
                </div>

                <div className="md-form">
                  <i className="fa fa-eye prefix purple-text" />
                  <input
                    type="password"
                    name="password"
                    id="materialFormCardPasswordEx"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                  {errors.password && (
                    <span className="field-error d-flex justify-content-end">
                      {errors.password}
                    </span>
                  )}

                  <label htmlFor="materialFormCardPasswordEx" className="font-weight-light">Your password</label>
                </div>

                <div className="text-center py-4 mt-3">
                  <button className="btn purple-gradient" type="submit" onClick={this.handleSubmit}>
                    Sign in
                  </button>
                </div>
                <div>
                  <p className="text-right">
                    Not a member?{' '}
                    <Link to="/signup" className="purple-text">Sign up</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});

SignIn.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
