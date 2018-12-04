import {COMMENTS_FETCHED} from '../actions/comments';
import {COMMENT_ADD_SUCCESS} from '../actions/comments';
// import {COMMENT_DELETE_SUCCESS} from '../actions/comments';

/// wat dacht je van een soort intelligente caching-structuur (ook met tickets enzo) van dat hij bepaalde spul onthoudt obv welk event/ticket het is enzo
export default function reducer(state=null, action={}) {
  switch (action.type) {
    case COMMENTS_FETCHED:
      return action.comments;
    case COMMENT_ADD_SUCCESS:
      return [action.comment, ...state];
    // case COMMENT_DELETE_SUCCESS:
    //   return state.filter(comment => comment.id !== action.commentId);
    default:
      return state;
  }
}