import { config } from 'api/config/config';
import { Sequelize } from 'sequelize';



import { defineDatabaseModels } from './models';


const database = new Sequelize({
  dialect: 'postgres',
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  port: config.DB_PORT,
});

const getCommonModelOptions = (tableName?: string, timestamps = false) => {
  return {
    tableName: tableName,
    sequelize: database,
    freezeTableName: true,
    timestamps: timestamps,
    quoteIdentifiers: false,
  };
};

defineDatabaseModels(database);

// database.sync({ alter: true });

export { getCommonModelOptions, database };