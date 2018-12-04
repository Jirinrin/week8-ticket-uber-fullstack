import request from 'superagent';

/// dit is twijfelachtig want wat als het andere url is???
const baseUrl = 'http://localhost:4000';


export const EVENTS_FETCHED = 'EVENTS_FETCHED';

const eventsFetched = events => ({
  type: EVENTS_FETCHED,
  events
});

export const loadEvents = () => (dispatch, getState) => {
  if (getState().events) return;

  request
    .get(`${baseUrl}/events`)
    .then(response => dispatch(eventsFetched(response.body.events)))
    .catch(console.error);
}


export const EVENT_ADD_SUCCESS = 'EVENT_ADD_SUCCESS';

const eventAddSuccess = event => ({
  type: EVENT_ADD_SUCCESS,
  event
});

// hoe kan thunk weten dat je dit aan het doen bent? het is zeker omdat er geen data() voorkomt dus gaat kijken wat de function returnt ofzo
export const addEvent = (data) => (dispatch, getState) => {
  // const jwt = getState().currentUser;
  console.log(data);
  request
    .post(`${baseUrl}/events`)
    // .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => dispatch(eventAddSuccess(response.body)))
    .catch(error => console.log(error));
}