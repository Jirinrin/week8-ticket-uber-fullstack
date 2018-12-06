import {COMMENTS_FETCHED} from '../actions/comments';
import {COMMENT_ADD_SUCCESS, COMMENT_DELETE_SUCCESS} from '../actions/comments';

export default function reducer(state=null, action={}) {
  switch (action.type) {
    case COMMENTS_FETCHED:
      return action.comments;
    case COMMENT_ADD_SUCCESS:
      return [action.comment, ...state];
    case COMMENT_DELETE_SUCCESS:
      return state.filter(comment => comment.id !== Number(action.commentId));
    default:
      return state;
  }
}