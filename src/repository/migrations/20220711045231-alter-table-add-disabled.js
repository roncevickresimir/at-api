'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.addColumn('Station', 'disabled', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false,
      });

      await queryInterface.addColumn('Quest', 'disabled', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false,
      });

      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
    }

  },
  async down(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn('Station', 'disabled');
      await queryInterface.removeColumn('Quest', 'disabled');

      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
    }

  },
};