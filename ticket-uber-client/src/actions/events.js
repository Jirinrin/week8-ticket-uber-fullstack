import request from 'superagent';

const baseUrl = 'http://localhost:4000';


export const EVENTS_FETCHED = 'EVENTS_FETCHED';

const eventsFetched = events => ({
  type: EVENTS_FETCHED,
  events
});

export const loadEvents = (pageSize, pageNo, search='', dateFilters=null) => (dispatch, getState) => {
  request
    .get(`${baseUrl}/events`)
    .query({pageSize, pageNo, search, dateFilters})
    .then(response => dispatch(eventsFetched(response.body.events)))
    .catch(console.error);
}


export const EVENT_ADD_SUCCESS = 'EVENT_ADD_SUCCESS';

const eventAddSuccess = event => ({
  type: EVENT_ADD_SUCCESS,
  event
});

export const addEvent = (data) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt;
  
  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => dispatch(eventAddSuccess(response.body)))
    .catch(console.error);
}


export const EVENT_FETCHED = 'EVENT_FETCHED';

const eventFetched = event => ({
  type: EVENT_FETCHED,
  event
});

export const loadEvent = eventId => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}`)
    .then(response => dispatch(eventFetched(response.body.event)))
    .catch(console.error);
}


export const EVENT_EDIT_SUCCESS = 'EVENT_EDIT_SUCCESS';

const eventEdited = event => ({
  type: EVENT_EDIT_SUCCESS,
  event
});

export const editEvent = (data, eventId) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt;

  request
    .patch(`${baseUrl}/events/${eventId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => dispatch(eventEdited(response.body)))
    .catch(console.error);
}


export const EVENT_DELETE_SUCCESS = 'EVENT_DELETE_SUCCESS';

const eventDeleted = eventId => ({
  type: EVENT_DELETE_SUCCESS,
  eventId
});

export const deleteEvent = (eventId) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt;

  request
    .delete(`${baseUrl}/events/${eventId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch(eventDeleted(eventId)))
    .catch(console.error);
}