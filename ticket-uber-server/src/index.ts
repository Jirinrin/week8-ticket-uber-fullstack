import {createKoaServer, Action} from 'routing-controllers';

import {toUserId} from './auth/jwt';
import setupDb from './db';
import User from './users/entity';

import EventController from './events/controller';
import TicketController from './tickets/controller';
import CommentController from './comments/controller';
import UserController from './users/controller';
import LoginController from './auth/logins';

const PORT = process.env.PORT || 4000;

const app = createKoaServer({
  cors: true,
  controllers: [
    EventController,
    TicketController,
    CommentController,
    UserController,
    LoginController
  ],
  authorizationChecker: (action: Action): boolean => {
    const header: string = action.request.headers.authorization;

    if (header && header.startsWith('Bearer ')) {
      const jwt = header.split(' ')[1];
      return Boolean(jwt && toUserId(jwt));
    }
    return false;
  },
  currentUserChecker: async (action: Action): Promise<User|undefined> => {
    const jwt = action.request.headers.authorization.split(' ')[1];
    if (!jwt) return undefined;
    return User.findOne({id: toUserId(jwt).data.id});
  }
});

setupDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch(console.error);