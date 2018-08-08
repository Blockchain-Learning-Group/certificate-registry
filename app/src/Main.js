import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import LoginRouter from './LoginRouter';
import indexRoutes from "routes/index.jsx";

import { isLoggedIn } from './services/AuthService';

var hist = createBrowserHistory();

export class Main extends React.Component {
  render() {
    return <Router history={hist}>
    {
      (isLoggedIn()) ?
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} key={key} component={prop.component} />;
        })}
      </Switch>
      :
      <LoginRouter />
    }
    </Router>
  }
}

export default Main;



