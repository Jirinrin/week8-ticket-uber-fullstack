import { JsonController, Post, Body, HttpCode,  HttpError, BadRequestError, HeaderParam } from 'routing-controllers';
import User from './entity';
import AdminPass from './adminPassEntity';

@JsonController()
export default class UserController {

  @Post('/users')
  @HttpCode(201)
  async createUser( @Body() {email, password, firstName, lastName}: User,
                    @HeaderParam('adminPass') adminPass: string ) {
    // // Uncomment this block of code to generate an admin password `adminadmin` on signup:
    // const newAdminPass = await AdminPass.create();
    // await newAdminPass.setPassword('adminadmin');
    // await newAdminPass.save();

    if (await User.findOne({email})) {
      throw new HttpError(409, 'User with that email already exists');
    }
    let newRole: 'user'|'admin' = 'user';
    if (adminPass !== null) {
      await Promise.all((await AdminPass.find()).map(async (entity: AdminPass) => {
        if (await entity.verifyPassword(adminPass)) newRole = 'admin';
      }));
      // Would like to actually implement this tries system
      if (newRole === 'user') throw new BadRequestError('Admin pass is incorrect, you have 2 more tries')
    }
    const newUser = User.create({email, password, firstName, lastName, role: newRole});
    await newUser.setPassword(password!);

    return newUser.save();
  }
}