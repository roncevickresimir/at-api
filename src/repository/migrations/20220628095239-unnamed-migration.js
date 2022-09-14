'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

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
            unique: true,
          },
          description: {
            field: 'description',
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
            unique: false,
          },
          userId: {
            field: 'userId',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
          },
          stationId: {
            field: 'stationId',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
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
          imageId: {
            field: 'imageId',
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
          rewardTypeId: {
            field: 'rewardTypeId',
            type: Sequelize.DataTypes.TEXT,
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
      await queryInterface.dropTable('RewardType', { transaction });
      await queryInterface.dropTable('Reward', { transaction });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
