import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import { Location } from '../dtos/Location';

export class Quest extends Model<
  InferAttributes<Quest>,
  InferCreationAttributes<
    Quest,
    { omit: 'id' | 'userId' | 'disabled' | 'image' }
  >
> {
  declare id: string;
  declare userId: string;
  declare title: string;
  declare description: string;
  declare location: Location;
  declare disabled?: boolean;
  declare image?: string;
}
