import { getCommonModelOptions } from 'repository';
import { Sequelize, TEXT, UUID, UUIDV4 } from 'sequelize';

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
        unique: true,
      },
      password: {
        type: TEXT,
        allowNull: false,
        unique: false,
      },
      username: {
        type: TEXT,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: TEXT,
        allowNull: false,
      },
      lastName: {
        type: TEXT,
        allowNull: false,
      },
    },
    {
      ...getCommonModelOptions('users'),
    },
  );

  return User;
};
