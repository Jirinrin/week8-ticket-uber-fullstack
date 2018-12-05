import request from 'superagent';

const baseUrl = 'http://localhost:4000';


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const loginSuccess = (userPayload) => ({
  type: LOGIN_SUCCESS,
  userPayload
});

export const login = (email, password) => (dispatch) => {
  request
    .post(`${baseUrl}/logins`)
    .send({email, password})
    .then(response => dispatch(loginSuccess(response.body)))
    .catch(console.error);
}


export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const logout = () => {
  return {type: LOGOUT_SUCCESS};
}