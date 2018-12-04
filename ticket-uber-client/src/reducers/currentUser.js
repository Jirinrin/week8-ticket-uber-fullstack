import {LOGIN_SUCCESS} from '../actions/auth';

export default function(state=null, action={}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.authentication.jwt;
    default: 
      return state;
  }
}