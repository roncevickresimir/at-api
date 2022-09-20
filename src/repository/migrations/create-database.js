'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    //Support.sequelize.query('CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public', {raw: true});
    try {
      await queryInterface.createTable(
        'Account',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            field: 'name',
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            unique: true,
          },
          abrv: {
            field: 'abrv',
            type: Sequelize.DataTypes.CITEXT,
            allowNull: false,
            unique: true,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        'Category',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            field: 'name',
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            unique: true,
          },
          abrv: {
            field: 'abrv',
            type: Sequelize.DataTypes.CITEXT,
            allowNull: false,
            unique: true,
          },
        },
        { transaction }
      );

      
      await queryInterface.createTable(
        'EndUser',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          userName: {
            field: 'username',
            type: Sequelize.CITEXT,
            allowNull: false,
          },
          email: {
            field: 'email',
            type: Sequelize.CITEXT,
            allowNull: false,
          },
          pasword: {
            field: 'pasword',
            type: Sequelize.CITEXT,
            allowNull: false,
            unique: false,
          },
        },
        { transaction }
      );
      
      await queryInterface.createTable(
        'EndUserQuest',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          questId: {
            field: 'questId',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
          },
          userId: {
            field: 'userId',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
          },
          started: {
            field: 'started',
            type: Sequelize.BOOLEAN,
            allowNull: false,
            unique: false,
            defaultValue: false,
          },
          complete: {
            field: 'complete',
            type: Sequelize.BOOLEAN,
            allowNull: false,
            unique: false,
            defaultValue: false,
          },
        },
        { transaction }
      );
      
      await queryInterface.createTable(
        'EndUserStation',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          stationId: {
            field: 'stationId',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
          },
          userId: {
            field: 'userId',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
          },
          complete: {
            field: 'complete',
            type: Sequelize.BOOLEAN,
            allowNull: false,
            unique: false,
            defaultValue: false,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        'Image',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          stationId: {
            field: 'stationId',
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            unique: false,
          },
          fileName: {
            field: 'fileName',
            type: Sequelize.DataTypes.CITEXT,
            allowNull: false,
          },
          fileExt: {
            field: 'fileExt',
            type: Sequelize.DataTypes.CITEXT,
            allowNull: false,
          },
          filePath: {
            field: 'filePath',
            type: Sequelize.DataTypes.CITEXT,
            allowNull: false,
          },
          createdAt: {
            field: 'createdAt',
            type: Sequelize.DATE,
            allowNull: false,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        'QRCode_Image',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          fileName: {
            field: 'fileName',
            type: Sequelize.DataTypes.CITEXT,
            allowNull: false,
          },
          fileExt: {
            field: 'fileExt',
            type: Sequelize.DataTypes.CITEXT,
            allowNull: false,
          },
          filePath: {
            field: 'filePath',
            type: Sequelize.DataTypes.CITEXT,
            allowNull: false,
          },
          createdAt: {
            field: 'createdAt',
            type: Sequelize.DATE,
            allowNull: false,
          },
          stationId: {
            field: 'stationId',
            type: Sequelize.UUID,
            allowNull: false,
            unique: false,
            defaultValue: Sequelize.literal(
              'uuid_in((md5((random())::text))::cstring)'
            ),
          }
        },
        { transaction }
      );
      
      await queryInterface.createTable(
        'Quest',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          title: {
            field: 'title',
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            unique: false,
          },
          description: {
            field: 'description',
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            unique: false,
          },
          categoryIds: {
            field: 'categoryIds',
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            unique: false,
          },
          userId: {
            field: 'userId',
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            unique: false,
          },
          latitude: {
            field: 'latitude',
            type: Sequelize.DOUBLE,
            allowNull: false,
            unique: false,
            defaultValue: 0,
          },
          longitude: {
            field: 'longitude',
            type: Sequelize.DOUBLE,
            allowNull: false,
            unique: false,
            defaultValue: 0,
          },
          disabled: {
            field: 'disabled',
            type: Sequelize.BOOLEAN,
            allowNull: false,
            unique: false,
            defaultValue: false,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        'Reward',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          userId: {
            field: 'userId',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
          },
          rewardTypeId: {
            field: 'rewardTypeId',
            type: Sequelize.UUID,
            allowNull: false,
            unique: false,
          },
        },
        { transaction }
      );
      
      await queryInterface.createTable(
        'RewardType',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            field: 'name',
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            unique: false,
          },
          description: {
            field: 'description',
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            unique: false,
          },
          stationId: {
            field: 'stationId',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
          },
          userId: {
            field: 'userId',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
          },
          image: {
            field: 'image',
            type: Sequelize.CITEXT,
            allowNull: true,
            unique: false,
          },
        },
        { transaction }
      );
      
      await queryInterface.createTable(
        'Role',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            field: 'name',
            type: Sequelize.CITEXT,
            allowNull: false,
          },
          abrv: {
            field: 'abrv',
            type: Sequelize.CITEXT,
            allowNull: false,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        'Station',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          title: {
            field: 'title',
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            unique: false,
          },
          description: {
            field: 'description',
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            unique: false,
          },
          categoryIds: {
            field: 'categoryIds',
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
            unique: false,
          },
          accountId: {
            field: 'accountId',
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            unique: false,
          },
          latitude: {
            field: 'latitude',
            type: Sequelize.DOUBLE,
            allowNull: false,
            unique: false,
            defaultValue: 0,
          },
          longitude: {
            field: 'longitude',
            type: Sequelize.DOUBLE,
            allowNull: false,
            unique: false,
            defaultValue: 0,
          },
          userId:{
            field: 'userId',
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            unique: false,
          },
          disabled: {
            field: 'disabled',
            type: Sequelize.BOOLEAN,
            allowNull: false,
            unique: false,
            defaultValue: false,
          },
        },
        { transaction }
      );
      
      await queryInterface.createTable(
        'Station_Quest_relation',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          stationId: {
            field: 'stationId',
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            unique: false,
          },
          questId: {
            field: 'questId',
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            unique: false,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        'User',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          userName: {
            field: 'userName',
            type: Sequelize.CITEXT,
            allowNull: false,
          },
          firstName: {
            field: 'firstName',
            type: Sequelize.CITEXT,
            allowNull: false,
          },
          lastName: {
            field: 'lastName',
            type: Sequelize.CITEXT,
            allowNull: false,
          },
          email: {
            field: 'email',
            type: Sequelize.CITEXT,
            allowNull: false,
          },
          roleId: {
            field: 'roleId',
            type: Sequelize.UUID,
            allowNull: false,
          },
          password: {
            field: 'password',
            type: Sequelize.CITEXT,
            allowNull: false,
            unique: false,
          },
        },
        { transaction }
      );


      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('Account', { transaction });
      await queryInterface.dropTable('Category', { transaction });
      await queryInterface.dropTable('EndUser', { transaction });
      await queryInterface.dropTable('EndUserQuest', { transaction });
      await queryInterface.dropTable('EndUserStation', { transaction });
      await queryInterface.dropTable('Image', { transaction });
      await queryInterface.dropTable('QRCode_Image', { transaction });
      await queryInterface.dropTable('Quest', { transaction });
      await queryInterface.dropTable('Reward', { transaction });
      await queryInterface.dropTable('RewardType', { transaction });
      await queryInterface.dropTable('Role', { transaction });
      await queryInterface.dropTable('Station', { transaction });
      await queryInterface.dropTable('Station_Quest_relation', { transaction });
      await queryInterface.dropTable('User', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
