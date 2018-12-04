import {LOGIN_SUCCESS} from '../actions/auth';

export default function(state=null, action={}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log(action);
      return action.authentication.jwt;
    default: 
      return state;
  }
}