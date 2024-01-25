import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import { Location } from '../dtos/Location';

export class Station extends Model<
  InferAttributes<Station>,
  InferCreationAttributes<
    Station,
    { omit: 'id' | 'userId' | 'disabled' | 'image' }
  >
> {
  declare id: string;
  declare userId: string;
  declare questId: string;
  declare title: string;
  declare description: string;
  declare location: Location;
  declare disabled: boolean;
  declare image?: string;
}
