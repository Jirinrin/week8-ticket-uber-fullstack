import {EVENT_FETCHED, EVENT_EDIT_SUCCESS} from '../actions/events';

export default function(state=null, action={}) {
  switch (action.type) {
    case EVENT_FETCHED:
      return action.event;
    case EVENT_EDIT_SUCCESS:
      return action.event;
    default:
      return state;
  }
}