import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/common/Header';
import NotFoundPage from './components/common/NotFoundPage';
import SignIn from './components/user/SignIn';
import SignUp from './components/user/SignUp';
import CheatSheet from './components/common/CheatSheet';

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <div>
        <Header />
      </div>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/cheat-sheet" component={CheatSheet} />
        <Route component={NotFoundPage} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default Routes;
