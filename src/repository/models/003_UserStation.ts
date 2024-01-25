import { getCommonModelOptions } from 'repository';
import { BOOLEAN, UUID } from 'sequelize';

import { Station, User, UserStation } from '@api/models';

export const initModel = () => {
  return UserStation.init(
    {
      userId: {
        type: UUID,
        references: {
          model: User,
          key: 'id',
        },
        primaryKey: true,
        allowNull: false,
      },
      stationId: {
        type: UUID,
        references: {
          model: Station,
          key: 'id',
        },
        primaryKey: true,
        allowNull: false,
      },
      complete: {
        type: BOOLEAN,
        defaultValue: false,
        allowNull: true,
        unique: false,
      },
    },
    {
      ...getCommonModelOptions('user_stations'),
    },
  );
};
