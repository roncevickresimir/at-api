import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export class UserQuest extends Model<
  InferAttributes<UserQuest>,
  InferCreationAttributes<UserQuest, { omit: 'complete' | 'progress' }>
> {
  declare userId: string;
  declare questId: string;
  declare progress: number;
  declare complete: boolean;
}
