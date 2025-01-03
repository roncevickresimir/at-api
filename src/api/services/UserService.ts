import { startCase, toLower } from 'lodash';
import { database } from 'repository';
import { Transaction } from 'sequelize';



import { PageRpp, ROLES, UserCreate } from '@api/dtos';
import { User } from '@api/models';
import { hashPassword } from '@api/util';

export class UserService {
  getById = async (id?: string): Promise<User | null> => {
    return User.findByPk(id);
  };

  GetByEmailAsync = async (email: string, role: ROLES): Promise<User | null> => {
    return User.findOne({
      where: {
        email: email,
        role: role,
      },
    });
  };

  GetByUserNameAsync = async (username: string, role: ROLES): Promise<User | null> => {
    return User.findOne({ where: { username: username, role: role } });
  };

  getUsers = async (filter: PageRpp = { page: 1, rpp: 20 }): Promise<User[] | null> => {
    return User.findAll({
      limit: filter.rpp,
      offset: (filter.page - 1) * filter.rpp,
    });
  };

  CountAllUsers = async (): Promise<number> => {
    return User.count();
  };

  CreateUserAsync = async (data: UserCreate, transaction: Transaction, role: ROLES): Promise<User> => {
    data.firstName = startCase(toLower(data.firstName));
    data.lastName = startCase(toLower(data.lastName));

    const password = await hashPassword(data.password);

    const user = await User.create(
      {
        ...data,
        password: password,
        role: role,
      },
      { transaction },
    );

    return user;
  };

  CreateEndUserAsync = async (data: UserCreate, transaction: Transaction): Promise<User> => {
    const password = await hashPassword(data.password);

    const entity = await User.create(
      {
        ...data,
        role: ROLES.USER,
        password: password,
      },
      {
        transaction,
      },
    );

    return entity;
  };

  PostLoginAsync = async (username?: string, email?: string): Promise<any | null> => {
    if (username)
      return User.findOne({
        where: {
          username: username,
        },
      });

    if (email)
      return User.findOne({
        where: {
          email: email,
        },
      });

    return null;
  };

  LoginUserAsync = async (username?: string, email?: string): Promise<User | null> => {
    if (username)
      return User.findOne({
        where: {
          username: username,
          role: [ROLES.USER, ROLES.ADMIN, ROLES.CLIENT],
        },
      });

    if (email)
      return User.findOne({
        where: {
          email: email,
          role: [ROLES.USER, ROLES.ADMIN, ROLES.CLIENT],
        },
      });

    return null;
  };
}