import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AuthCallback from './components/AuthCallback';
import Login from './components/Login';

export class Router extends React.Component {
  render() {
    return (
      <div className="ulr-main">
        <Switch>
          <Route exact={true} path="/authCallback" component={AuthCallback} />
          <Route component={Login} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Router);
