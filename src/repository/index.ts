import { Sequelize } from 'sequelize';

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../config';

const database = new Sequelize({
    dialect: 'postgres',
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
});

const getCommonModelOptions = (tableName: string, timestamps = false) => {
    return {
        tableName: tableName,
        // this is required - passing instance of sequelize
        sequelize: database,
        freezeTableName: true,
        timestamps: timestamps,
        quoteIdentifiers: false,
    };
};

//database.sync();

export { getCommonModelOptions };

export default database;
