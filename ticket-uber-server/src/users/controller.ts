import { JsonController, Post, Body, HttpCode, NotAcceptableError, BadRequestError } from "routing-controllers";
import User from "./entity";
import AdminPass from "./adminPassEntity";

@JsonController()
export default class UserController {

  @Post('/users')
  @HttpCode(201)
  async createUser( @Body() {userData: {email, password, firstName, lastName}, adminPass}: {userData: Partial<User>, adminPass: string|null} ) {

    // const newAdminPass = await AdminPass.create();
    // await newAdminPass.setPassword('adminadmin');
    // await newAdminPass.save();
    console.log(email, password, firstName, lastName, adminPass);
    
    if (await User.findOne({email})) {
      /// vgm is dit (406) niet juiste code
      throw new NotAcceptableError('User with that email already exists');
    }
    let role: 'user'|'admin' = 'user';
    if (adminPass !== null) {
      await Promise.all((await AdminPass.find()).map(async (entity: AdminPass) => {
        if (await entity.verifyPassword(adminPass)) role = 'admin';
      }));
      if (role === 'user') throw new BadRequestError('Admin pass is incorrect, you have 2 more tries')
    }
    const newUser = User.create({email, password, firstName, lastName, role});
    await newUser.setPassword(password!);

    return newUser.save();
  }
}