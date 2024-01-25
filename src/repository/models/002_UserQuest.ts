import { getCommonModelOptions } from 'repository';
import { BOOLEAN, INTEGER, UUID } from 'sequelize';

import { Quest, User, UserQuest } from '@api/models';

export const initModel = () => {
  return UserQuest.init(
    {
      userId: {
        type: UUID,
        references: {
          model: User,
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
      },
      questId: {
        type: UUID,
        references: {
          model: Quest,
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
      },
      progress: {
        type: INTEGER,
        defaultValue: 0,
        allowNull: false,
        unique: false,
      },
      complete: {
        type: BOOLEAN,
        defaultValue: false,
        allowNull: true,
        unique: false,
      },
    },
    {
      ...getCommonModelOptions('user_quests'),
    },
  );
};
