import request from 'superagent';

const baseUrl = 'http://localhost:4000';


export const TICKETS_FETCHED = 'TICKETS_FETCHED';

const ticketsFetched = tickets => ({
  type: TICKETS_FETCHED,
  tickets
});

export const loadTickets = (eventId) => (dispatch, getState) => {
  // if (getState().tickets) return;

  request
    .get(`${baseUrl}/events/${eventId}/tickets`)
    .then(response => dispatch(ticketsFetched(response.body.tickets)))
    .catch(console.error);
}


export const TICKET_ADD_SUCCESS = 'TICKET_ADD_SUCCESS';

const ticketAddSuccess = ticket => ({
  type: TICKET_ADD_SUCCESS,
  ticket
});

export const addTicket = (data, eventId) => (dispatch, getState) => {
  const jwt = getState().currentUser;
  console.log(data);
  request
    .post(`${baseUrl}/events/${eventId}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => dispatch(ticketAddSuccess(response.body)))
    .catch(console.error);
}


export const TICKET_FETCHED = 'TICKET_FETCHED';

const ticketFetched = ticket => ({
  type: TICKET_FETCHED,
  ticket
});

export const loadTicket = (eventId, ticketId) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .then(response => dispatch(ticketFetched(response.body.ticket)))
    .catch(console.error);
}