import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  LOGIN, REGISTER, FORGOT_PASSWORD, RESET_PASSWORD, DASHBOARD
} from './routeContants';
import { isLoggedIn } from './authService';
import DashBoard from '../view/screen/dashboard/dashboard';
import Login from '../view/screen/login/login';
import Register from '../view/screen/login/register';
import ResetPassword from '../view/screen/login/reset-password';
import ForgotPassword from '../view/screen/login/forgot-password';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={props => (
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: LOGIN,
            state: { from: props.location },
          }}
          />
        )
    )}
  />
);

const PublicRoute = ({ component: Component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={props => (
      !isLoggedIn() || isLoggedIn() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: DASHBOARD,
            state: { from: props.location },
          }}
          />
        )
    )}
  />
);

const LoginRoute = ({ component: Component, ...rest }: IProps) => (
  <Route
    {...rest}
    render={props => (
      !isLoggedIn() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: DASHBOARD,
            state: { from: props.location },
          }}
          />
        )
    )}
  />
);


const router = () => {
  return <Switch>
    <LoginRoute exact path={LOGIN} component={Login} />
    <PublicRoute exact path={REGISTER} component={Register} />
    <PublicRoute exact path={RESET_PASSWORD} component={ResetPassword} />
    <PublicRoute exact path={FORGOT_PASSWORD} component={ForgotPassword} />
    <PrivateRoute exact path={DASHBOARD} component={DashBoard} />
    <Redirect from="/*" to={LOGIN} />
  </Switch>
}

export default router;