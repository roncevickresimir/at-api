'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeConstraint('RewardType', 'RewardType_name_key');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
};