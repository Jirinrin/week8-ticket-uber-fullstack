import request from 'superagent';

const baseUrl = 'http://localhost:4000';


export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const signUp = (userData, adminPass) => (dispatch) => {
  console.log(adminPass);
  
  request
    .post(`${baseUrl}/users`)
    .send({userData, adminPass})
    // .query({adminPass})
    .then(_ => dispatch({type: SIGNUP_SUCCESS}))
    .catch(console.error);
}