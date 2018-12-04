import request from 'superagent';

const baseUrl = 'http://localhost:4000';


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const loginSuccess = (authentication) => ({
  type: LOGIN_SUCCESS,
  authentication
});

export const login = (email, password) => (dispatch) => {
  request
    .post(`${baseUrl}/logins`)
    .send({email, password})
    .then(response => dispatch(loginSuccess(response.body)))
    .catch(console.error);
}