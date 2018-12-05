import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../actions/auth';

export default function(state=null, action={}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.authentication.jwt;
    case LOGOUT_SUCCESS:
      return null;
    default: 
      return state;
  }
}