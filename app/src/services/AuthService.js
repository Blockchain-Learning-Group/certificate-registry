import decode from 'jwt-decode';
// import { Redirect } from 'react-router-dom';
import auth0 from 'auth0-js';

const API_URL = process.env.REACT_APP_API_URL;

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'JM3IVOWb1xe2SzXAjtBoJMsmK3nEQE4a';
const CLIENT_DOMAIN = 'blockscale.auth0.com';
const REDIRECT = `${API_URL}:3000/authCallback`;
const SCOPE = 'openid profile';
const AUDIENCE = 'http://blockscale.auth.com';

const auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  //   return Redirect('/');
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: '/' });
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

export function getUserProfile() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  return new Promise((resolve, reject) => {
    auth.client.userInfo(accessToken, (err, profile) => {
      if (err) {
        reject(err);
      } else if (profile) {
        resolve(profile);
      }
    });
  });
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
