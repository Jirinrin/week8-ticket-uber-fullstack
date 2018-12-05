import {EVENTS_FETCHED} from '../actions/events';
import {EVENT_ADD_SUCCESS} from '../actions/events';
// import {EVENT_CREATE_SUCCESS, EVENT_DELETE_SUCCESS} from '../actions/events';

export default function reducer(state=null, action={}) {
  switch (action.type) {
    case EVENTS_FETCHED:
      return action.events;
    case EVENT_ADD_SUCCESS:
      return [action.event, ...state];
    // case EVENT_DELETE_SUCCESS:
    //   return state.filter(event => event.id !== action.eventId);
    default:
      return state;
  }
}