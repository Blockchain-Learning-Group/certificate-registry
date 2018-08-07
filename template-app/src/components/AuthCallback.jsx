import * as React from 'react';
import { getUserProfile, setIdToken, setAccessToken } from '../services/AuthService';

class AuthCallback extends React.Component {
  async componentDidMount() {
    const userProfile = await getUserProfile();
    const email = userProfile.name;

    // redirect to the user profile 
    window.location.href = `/profile/${email}`;
  }

  render() {
    setAccessToken();
    setIdToken();
    return null;
  }
}

export default AuthCallback;
