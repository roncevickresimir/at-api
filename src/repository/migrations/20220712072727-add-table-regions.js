'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'Region',
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
            type: Sequelize.TEXT,
            unique: false,
            allowNull: false,
          },
          abrv: {
            field: 'abrv',
            type: Sequelize.CITEXT,
            unique: true,
            allowNull: false,
          },
          latitude: {
            field: 'latitude',
            type: Sequelize.DECIMAL,
            unique: false,
            allowNull: false,
          },
          longitude: {
            field: 'longitude',
            type: Sequelize.DECIMAL,
            unique: false,
            allowNull: false,
          },
          radius: {
            field: 'radius',
            type: Sequelize.DECIMAL,
            unique: false,
            allowNull: false,
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
      await queryInterface.dropTable('Region', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
