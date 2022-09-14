'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
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

      await queryInterface.removeColumn("Station", "questId", transaction);

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('Station_Quest_relation', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
