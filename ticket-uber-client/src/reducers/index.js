import {combineReducers} from 'redux';
import comments from './comments';
import currentUser from './currentUser';
import events from './events';
import event from './event';
import ticket from './ticket';
import tickets from './tickets';

export default combineReducers({
  comments,
  currentUser,
  event,
  events,
  ticket,
  tickets
});