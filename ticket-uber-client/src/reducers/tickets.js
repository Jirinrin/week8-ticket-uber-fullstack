import {TICKETS_FETCHED} from '../actions/tickets';
import {TICKET_ADD_SUCCESS} from '../actions/tickets';
// import {TICKET_DELETE_SUCCESS} from '../actions/tickets';

export default function reducer(state=null, action={}) {
  switch (action.type) {
    case TICKETS_FETCHED:
      return action.tickets;
    case TICKET_ADD_SUCCESS:
      return [action.ticket, ...state];
    // case TICKET_DELETE_SUCCESS:
    //   return state.filter(ticket => ticket.id !== action.ticketId);
    default:
      return state;
  }
}