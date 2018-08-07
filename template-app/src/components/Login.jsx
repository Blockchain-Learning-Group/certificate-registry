import * as React from 'react';
import { login } from '../services/AuthService';

const Login = () => {
  login();
  return <div />;
};

export default Login;
