import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import { ROLES } from '../dtos/User';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User, { omit: 'id' }>
> {
  declare id: string;
  declare role: ROLES;
  declare email: string;
  declare password: string;
  declare username: string;
  declare firstName?: string;
  declare lastName?: string;
}
