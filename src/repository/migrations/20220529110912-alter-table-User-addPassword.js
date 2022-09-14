'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('User', 'password', {
        type: Sequelize.CITEXT,
        allowNull: false,
        unique: false,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'password');
  },
};