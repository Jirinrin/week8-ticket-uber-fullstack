import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../actions/auth';

export default function(state=null, action={}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        jwt: action.userPayload.jwt,
        id: action.userPayload.id
      };
    case LOGOUT_SUCCESS:
      return null;
    default: 
      return state;
  }
}