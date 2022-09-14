'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('Quest', 'image', {
        type: Sequelize.CITEXT,
        allowNull: true,
        unique: false,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Quest', 'image');
  },
};