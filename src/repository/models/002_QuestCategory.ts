import { getCommonModelOptions } from 'repository';
import { UUID } from 'sequelize';

import { Category, Quest, QuestCategory } from '@api/models';

export const initModel = () => {
  return QuestCategory.init(
    {
      questId: {
        type: UUID,
        references: {
          model: Quest,
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
      },
      categoryId: {
        type: UUID,
        references: {
          model: Category,
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      ...getCommonModelOptions('quest_categories'),
    },
  );
};
