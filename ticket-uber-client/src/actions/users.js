import request from 'superagent';

const baseUrl = 'http://localhost:4000';


export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const signUp = (userData, adminPass, callback, errorCallback) => (dispatch) => {
  request
    .post(`${baseUrl}/users`)
    .set('adminPass', adminPass)
    .send({...userData, role: 'user'})
    .then(_ => dispatch({type: SIGNUP_SUCCESS}))
    .then(callback)
    .catch(error => {
      console.error(error);
      errorCallback(error);
    });
}