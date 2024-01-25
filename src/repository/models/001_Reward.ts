import { getCommonModelOptions } from 'repository';
import { Sequelize, TEXT, UUID, UUIDV4 } from 'sequelize';

import { Reward, User } from '@api/models';

export const initModel = () => {
  return Reward.init(
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: TEXT,
        allowNull: false,
        unique: false,
      },
      description: {
        type: TEXT,
        allowNull: true,
      },
      userId: {
        type: UUID,
        allowNull: false,
        unique: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      image: {
        type: TEXT,
        allowNull: true,
        unique: false,
      },
    },
    {
      ...getCommonModelOptions('rewards'),
    },
  );
};
