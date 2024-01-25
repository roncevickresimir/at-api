import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export class UserStation extends Model<InferAttributes<UserStation>, InferCreationAttributes<UserStation>> {
  declare userId: string;
  declare stationId: string;
  declare complete: boolean;
}
