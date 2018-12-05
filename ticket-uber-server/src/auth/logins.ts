import {JsonController, Post, Body, BadRequestError} from 'routing-controllers';
import User from '../users/entity';
import {toJwt} from './jwt';

@JsonController()
export default class LoginController {

  @Post('/logins')
  async authenticate( @Body() {email, password}: Partial<User> ) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new BadRequestError('This combination of email and password is invalid');

    if (!await user.verifyPassword(password!)) throw new BadRequestError('This combination of email and password is invalid');

    const jwt = toJwt({ id: user.id! });
    return { jwt, id: user.id };
  }
}