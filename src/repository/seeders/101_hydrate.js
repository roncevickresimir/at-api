'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(
        'users',
        [
          {
            id: v4(),
            username: 'SuperAdmin',
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@avantourist.eu',
            password:
              '$2y$10$5OLgHxOtUqj0xsdJRUbRQuUtdvM6ol5BM7egBDPf8ZAPxF79VL/ru',
            role: 'admin',
          },
          {
            id: v4(),
            username: 'TestUser',
            firstName: 'Test',
            lastName: 'User',
            email: 'tuser@avantourist.eu',
            password:
              '$2y$10$5OLgHxOtUqj0xsdJRUbRQuUtdvM6ol5BM7egBDPf8ZAPxF79VL/ru',
            role: 'user',
          },
        ],
        { transaction },
      );

      await queryInterface.bulkInsert('categories', [
        {
          id: v4(),
          abrv: 'gastro',
          name: 'Gastro',
        },
        {
          id: v4(),
          abrv: 'nature',
          name: 'Nature',
        },
        {
          id: v4(),
          abrv: 'adrenaline',
          name: 'Adrenaline',
        },
        {
          id: v4(),
          abrv: 'beach',
          name: 'Beach',
        },
        {
          id: v4(),
          abrv: '18+',
          name: '18+',
        },
        {
          id: v4(),
          abrv: 'party',
          name: 'Party',
        },
        {
          id: v4(),
          abrv: 'teen',
          name: 'Teen',
        },
        {
          id: v4(),
          abrv: 'family',
          name: 'Family',
        },
      ]);

      await queryInterface.bulkInsert('quests', [
        {
          id: 'aa90c0bb-ead7-435e-9cba-8b7fac571b8a',
          title: 'Test',
          description: 'Gastro',
          userId: '43de870e-7d39-4c73-91c9-ba60647cbede',
          location: '{"latitude":"100","longitude":"100"}',
          disabled: false,
          image: 'img.png',
        },
      ]);

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('users', null, {
        transaction,
      });
      await queryInterface.bulkDelete('categories', null, {
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
};
