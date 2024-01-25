import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

import { buildAssociations } from './associationBuilder';

export const defineDatabaseModels = (database: Sequelize) => {
  const basename = path.basename(__filename);
  fs.readdirSync(__dirname)
    .filter((file) => ![basename, 'associationBuilder.ts', 'associationBuilder.js'].includes(file))
    .forEach((file) => {
      require(path.join(__dirname, file)).initModel(database);
    });

  buildAssociations(database);

  return database;
};
