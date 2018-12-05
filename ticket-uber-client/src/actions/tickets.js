import request from 'superagent';

const baseUrl = 'http://localhost:4000';


export const TICKETS_FETCHED = 'TICKETS_FETCHED';

const ticketsFetched = tickets => ({
  type: TICKETS_FETCHED,
  tickets
});

export const loadTickets = (eventId) => (dispatch, getState) => {
  // if (getState().tickets) return;
  console.log(eventId);

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
  const jwt = getState().currentUser.jwt;
  
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


export const TICKET_EDIT_SUCCESS = 'TICKET_EDIT_SUCCESS';

const ticketEdited = ticket => ({
  type: TICKET_EDIT_SUCCESS,
  ticket
});

export const editTicket = (data, eventId, ticketId) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt;

  request
    .patch(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => dispatch(ticketEdited(response.body)))
    .catch(console.error);
}


export const TICKET_DELETE_SUCCESS = 'TICKET_DELETE_SUCCESS';

const ticketDeleted = ticketId => ({
  type: TICKET_DELETE_SUCCESS,
  ticketId
});

export const deleteTicket = (eventId, ticketId) => (dispatch, getState) => {
  const jwt = getState().currentUser;

  request
    .delete(`${baseUrl}/events/${eventId}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch(ticketDeleted(ticketId)))
    .catch(console.error);
}
