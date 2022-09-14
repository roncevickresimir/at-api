'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
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
      await queryInterface.dropTable('QRCode_Image', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
