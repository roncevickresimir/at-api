import { getCommonModelOptions } from 'repository';
import { TEXT, UUID, UUIDV4 } from 'sequelize';

import { User } from '@api/models';

export const initModel = () => {
  User.init(
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      role: {
        type: TEXT,
        allowNull: false,
      },
      email: {
        type: TEXT,
        allowNull: false,
        unique: false,
      },
      password: {
        type: TEXT,
        allowNull: false,
        unique: false,
      },
      username: {
        type: TEXT,
        allowNull: false,
        unique: false,
      },
      firstName: {
        type: TEXT,
        allowNull: true,
      },
      lastName: {
        type: TEXT,
        allowNull: true,
      },
    },
    {
      ...getCommonModelOptions('users'),
    },
  );

  return User;
};