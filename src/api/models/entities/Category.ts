import { InferAttributes, Model } from 'sequelize';

import { CreateCategory } from '@api/dtos';

export class Category extends Model<InferAttributes<Category>, CreateCategory> {
  public id: string;
  public abrv: string;
  public name: string;
}
