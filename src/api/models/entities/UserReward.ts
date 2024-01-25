import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export class UserReward extends Model<
  InferAttributes<UserReward>,
  InferCreationAttributes<UserReward>
> {
  declare userId: string;
  declare rewardId: string;
}
