import { getCommonModelOptions } from 'repository';
import { Sequelize, UUID } from 'sequelize';

import { Reward, User, UserReward } from '@api/models';

export const initModel = () => {
  return UserReward.init(
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
      rewardId: {
        type: UUID,
        references: {
          model: Reward,
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      ...getCommonModelOptions('user_rewards'),
    },
  );
};
