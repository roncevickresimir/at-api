import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export class QuestCategory extends Model<
  InferAttributes<QuestCategory>,
  InferCreationAttributes<QuestCategory>
> {
  declare questId: string;
  declare categoryId: string;
}
