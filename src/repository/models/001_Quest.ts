import { getCommonModelOptions } from 'repository';
import {
  BOOLEAN,
  DOUBLE,
  JSON,
  Sequelize,
  TEXT,
  UUID,
  UUIDV4,
} from 'sequelize';

import { Quest, User } from '@api/models';

export const initModel = () => {
  return Quest.init(
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: TEXT,
        allowNull: false,
        unique: true,
      },
      description: {
        type: TEXT,
        allowNull: true,
        unique: false,
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
      location: {
        type: JSON,
        allowNull: false,
        unique: false,
      },
      disabled: {
        type: BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false,
      },
      image: {
        type: TEXT,
        allowNull: true,
        unique: false,
      },
    },
    {
      ...getCommonModelOptions('quests'),
    },
  );
};
