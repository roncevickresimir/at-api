import { getCommonModelOptions } from 'repository';
import { TEXT, UUID, UUIDV4 } from 'sequelize';

import { Category } from '@api/models';

export const initModel = () => {
  Category.init(
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      abrv: {
        type: TEXT,
        allowNull: false,
        unique: true,
      },
      name: {
        type: TEXT,
        allowNull: true,
        unique: false,
      },
    },
    {
      ...getCommonModelOptions('categories'),
    },
  );

  return Category;
};
