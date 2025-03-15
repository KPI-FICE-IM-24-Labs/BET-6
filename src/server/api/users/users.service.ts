import e from 'express';
import User from '../../../models/user.model';

export class UsersService {
  public async getAllUsers(req: e.Request, res: e.Response) {
    const users = await User.find();
    res.render('users.hbs', { users });
  }

  public async getAllUsersJSON(req: e.Request, res: e.Response) {
    const users = await User.find();
    res.json(users);
  }

  public async createUser(req: e.Request, res: e.Response) {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.redirect('/users');
  }

  public async updateUser(req: e.Request, res: e.Response) {
    const { id } = req.params;
    const { name, email, age } = req.body;
    await User.findByIdAndUpdate(id, { name, email, age });
    res.redirect('/users');
  }

  public async deleteUser(req: e.Request, res: e.Response) {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/users');
  }
}
