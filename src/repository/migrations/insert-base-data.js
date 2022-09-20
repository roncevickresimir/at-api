'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {

    const transaction = await queryInterface.sequelize.transaction();

    try {

      const idAdmin = v4();

      await queryInterface.bulkInsert(
        'Role',
        [
          {
            id: v4(),
            abrv: 'office',
            name: 'Office',
          },
          {
            id: idAdmin,
            abrv: 'admin',
            name: 'Admin',
          },
          {
            id: v4(),
            abrv: 'object',
            name: 'Object',
          },
          {
            id: v4(),
            abrv: 'user',
            name: 'User',
          },
        ],
        { transaction }
      );

      await queryInterface.bulkInsert(
        'User',
        [
          {
            id: v4(),
            userName: 'SuperAdmin',
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@avantourist.eu',
            password: '$2y$10$5OLgHxOtUqj0xsdJRUbRQuUtdvM6ol5BM7egBDPf8ZAPxF79VL/ru',
            roleId: idAdmin,
          },
        ],
        { transaction }
      );
      
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
      );
      
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('Role', null, {
        transaction,
      });
      await queryInterface.bulkDelete('User', null, {
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
};
