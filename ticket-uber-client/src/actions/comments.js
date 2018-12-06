import request from 'superagent';

const baseUrl = 'http://localhost:4000';


export const COMMENTS_FETCHED = 'COMMENTS_FETCHED';

const commentsFetched = comments => ({
  type: COMMENTS_FETCHED,
  comments
});

export const loadComments = (eventId, ticketId) => (dispatch, getState) => {
  request
    .get(`${baseUrl}/events/${eventId}/tickets/${ticketId}/comments`)
    .then(response => dispatch(commentsFetched(response.body.comments)))
    .catch(console.error);
}


export const COMMENT_ADD_SUCCESS = 'COMMENT_ADD_SUCCESS';

const commentAddSuccess = comment => ({
  type: COMMENT_ADD_SUCCESS,
  comment
});

export const addComment = (data, eventId, ticketId, callback) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt;
  
  request
    .post(`${baseUrl}/events/${eventId}/tickets/${ticketId}/comments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => dispatch(commentAddSuccess(response.body)))
    .then(callback)
    .catch(console.error);
}


export const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS';

const commentDeleted = commentId => ({
  type: COMMENT_DELETE_SUCCESS,
  commentId
});

export const deleteComment = (eventId, ticketId, commentId, callback) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt;

  request
    .delete(`${baseUrl}/events/${eventId}/tickets/${ticketId}/comments/${commentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(_ => dispatch(commentDeleted(commentId)))
    .then(callback)
    .catch(console.error);
}