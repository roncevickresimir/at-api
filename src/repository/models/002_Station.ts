import { getCommonModelOptions } from 'repository';
import { BOOLEAN, JSON, TEXT, UUID, UUIDV4 } from 'sequelize';

import { Quest, Station, User } from '@api/models';

export const initModel = () => {
  return Station.init(
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
        unique: false,
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
      questId: {
        type: UUID,
        allowNull: false,
        unique: false,
        references: {
          model: Quest,
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
    },
    {
      ...getCommonModelOptions('stations'),
    },
  );
};
