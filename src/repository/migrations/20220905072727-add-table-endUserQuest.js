'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
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
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('EndUserQuest', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};