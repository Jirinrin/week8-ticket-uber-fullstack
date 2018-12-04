import request from 'superagent';

const baseUrl = 'http://localhost:4000';


export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const signUp = (userData) => (dispatch) => {
  request
    .post(`${baseUrl}/users`)
    .send(userData)
    .then(_ => dispatch({type: SIGNUP_SUCCESS}))
    .catch(console.error);
}