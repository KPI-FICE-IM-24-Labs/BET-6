import User from '../models/user.model';

export const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_: any, { id }: { id: string }) => await User.findById(id),
  },
  Mutation: {
    createUser: async (_: any, { name, email, age }: { name: string, email: string, age: number }) => {
      const user = new User({ name, email, age });
      await user.save();
      return user;
    },
    updateUser: async (_: any, { id, name, email, age }: { id: string, name?: string, email?: string, age?: number }) => {
      return User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      await User.findByIdAndDelete(id);
      return true;
    },
  }
}
