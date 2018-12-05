import {TICKET_FETCHED, TICKET_EDIT_SUCCESS} from '../actions/tickets';

export default function(state=null, action={}) {
  switch (action.type) {
    case TICKET_FETCHED:
      return action.ticket;
    case TICKET_EDIT_SUCCESS:
      return action.ticket;
    default:
      return state;
  }
}