import { JsonController, Post, Body, HttpCode, NotAcceptableError } from "routing-controllers";
import User from "./entity";

@JsonController()
export default class UserController {

  @Post('/users')
  @HttpCode(201)
  async createUser( @Body() {email, password, firstName, lastName}: User ) {
    if (await User.findOne({email})) {
      /// vgm is dit (406) niet juiste code
      throw new NotAcceptableError('User with that email already exists');
    }
    const newUser = User.create({email, firstName, lastName});
    await newUser.setPassword(password);

    return newUser.save();
  }
}