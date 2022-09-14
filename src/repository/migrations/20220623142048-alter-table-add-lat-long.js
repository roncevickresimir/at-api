'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('Station', 'latitude', {
        type: Sequelize.DOUBLE,
        allowNull: false,
        unique: false,
        defaultValue: 0,
      });
      await queryInterface.addColumn('Station', 'longitude', {
        type: Sequelize.DOUBLE,
        allowNull: false,
        unique: false,
        defaultValue: 0,
      });
      await queryInterface.addColumn('Quest', 'latitude', {
        type: Sequelize.DOUBLE,
        allowNull: false,
        unique: false,
        defaultValue: 0,
      });
      await queryInterface.addColumn('Quest', 'longitude', {
        type: Sequelize.DOUBLE,
        allowNull: false,
        unique: false,
        defaultValue: 0,
      });

      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
    }

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Station', 'latitude');
    await queryInterface.removeColumn('Station', 'longitude');
    await queryInterface.removeColumn('Quest', 'latitude');
    await queryInterface.removeColumn('Quest', 'longitude');
  },
};