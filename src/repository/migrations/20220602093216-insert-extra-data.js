'use strict';

const { v4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {

    const transaction = await queryInterface.sequelize.transaction();

    try {


      await queryInterface.bulkInsert(
        'Account',
        [
          {
            id: v4(),
            abrv: 'free',
            name: 'Free',
          },
          {
            id: v4(),
            abrv: 'premium',
            name: 'Premium',
          },
          {
            id: v4(),
            abrv: 'premium-plus',
            name: 'Premiun plus',
          },
        ],
        { transaction }
      );


      await queryInterface.bulkInsert(
        'Category',
        [
          {
            id: v4(),
            abrv: 'gastro',
            name: 'Gastro',
          }, {
            id: v4(),
            abrv: 'nature',
            name: 'Nature',
          }, {
            id: v4(),
            abrv: 'adrenaline',
            name: 'Adrenaline',
          }, {
            id: v4(),
            abrv: 'beach',
            name: 'Beach',
          }, {
            id: v4(),
            abrv: '18+',
            name: '18+',
          }, {
            id: v4(),
            abrv: 'party',
            name: 'Party',
          }, {
            id: v4(),
            abrv: 'teen',
            name: 'Teen',
          }, {
            id: v4(),
            abrv: 'family',
            name: 'Family',
          },
        ],
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('Account', null, {
        transaction,
      });
      await queryInterface.bulkDelete('Categories', null, {
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
};

