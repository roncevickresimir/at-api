import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export class Reward extends Model<
  InferAttributes<Reward>,
  InferCreationAttributes<Reward, { omit: 'id' }>
> {
  declare id: string;
  declare name: string;
  declare description: string;
  declare userId: string;
  declare image: string;
}
