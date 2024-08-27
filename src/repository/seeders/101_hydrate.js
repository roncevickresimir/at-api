'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4 } = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    let transaction = await queryInterface.sequelize.transaction();

    const adminId = v4();
    try {
      await queryInterface.bulkInsert(
        'users',
        [
          {
            id: adminId,
            username: 'SuperAdmin',
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@avantourist.eu',
            password: '$2y$10$5OLgHxOtUqj0xsdJRUbRQuUtdvM6ol5BM7egBDPf8ZAPxF79VL/ru',
            role: 'admin',
          },
          {
            id: v4(),
            username: 'TestUser',
            firstName: 'Test',
            lastName: 'User',
            email: 'test@avantourist.eu',
            password: '$2y$10$5OLgHxOtUqj0xsdJRUbRQuUtdvM6ol5BM7egBDPf8ZAPxF79VL/ru',
            role: 'user',
          },
        ],
        { transaction },
      );

      await transaction.commit();
      transaction = await queryInterface.sequelize.transaction();

      const gastroId = v4();
      const natureId = v4();
      const adrenalineId = v4();
      const beachId = v4();
      const ageId = v4();
      const partyId = v4();
      const teenId = v4();
      const familyId = v4();

      await queryInterface.bulkInsert('categories', [
        {
          id: gatstroId,
          abrv: 'gastro',
          name: 'Gastro',
        },
        {
          id: natureId,
          abrv: 'nature',
          name: 'Nature',
        },
        {
          id: adrenalineId,
          abrv: 'adrenaline',
          name: 'Adrenaline',
        },
        {
          id: beachId,
          abrv: 'beach',
          name: 'Beach',
        },
        {
          id: ageId,
          abrv: 'age',
          name: '18+',
        },
        {
          id: partyId,
          abrv: 'party',
          name: 'Party',
        },
        {
          id: teenId,
          abrv: 'teen',
          name: 'Teen',
        },
        {
          id: familyId,
          abrv: 'family',
          name: 'Family',
        },
      ]);

      let questId = v4();
      await queryInterface.bulkInsert('quests', [
        {
          id: questId,
          title: 'Benkovac Local',
          description: `Benkovac is a town in northern Dalmatia, located about 30 km east of Zadar and 20 km northeast of
          Biograd na Moru. It developed during the transition from the fertile area of ​​Ravni Kotar to the rugged
          area of ​​Bukovica. Although it is located on the eastern edge of the plain of Ravnokotar, as the only
          urban settlement it is considered the center of that area.
          Today, we are taking you on a journey through Benkovac to show you how a real local spends his or
          her day.`,
          userId: adminId,
          location: '{"latitude":"100","longitude":"100"}',
          disabled: false,
          image: 'img.png',
        },
      ]);

      let st1 = v4();
      let st2 = v4();
      let st3 = v4();
      let st4 = v4();
      let st5 = v4();
      let st6 = v4();
      await queryInterface.bulkInsert('stations', [
        {
          id: st1,
          title: 'Prisnac Palooza',
          description: `Welcome to the world of Benkovac prisnac, a culinary delight that&#39;s as rich in tradition as it is in
          flavor! Picture this: a savory pie that whispers tales of generations past, with each bite a journey
          through the rustic charm of Croatia's culinary heritage. Made with love and a sprinkle of magic,
          Benkovac prisnac is not just a dish; it's a passport to the soul of Dalmatia. So, get ready to embark on
          a taste adventure like no other, where every forkful is a step closer to gastronomic bliss!
          Find a restaurant or a tavern that makes Benkovački prisnac. Take a selfie when you try your first
          bite. We want to see your initial reaction. Post it on any social media with #(your name)in Benkovac

          Find a restaurant or a tavern that makes Benkovački prisnac. Take a selfie when you try your first
          bite. We want to see your initial reaction. Post it on any social media with #(your name)in Benkovac`,
          userId: adminId,
          questId: questId,
          location: '{"latitude":"100","longitude":"100"}',
          disabled: false,
        },
        {
          id: st2,
          title: 'Benkovac local heritage hunt',
          description: `The Benkovac Heritage Museum is located in the medieval Benkovic Castle, which is home to many
          artifacts from the Benkovac area, the collection of which began at the end of the 19th century.
          Through numerous collections, the museum shows visitors the local history and customs of the
          Benkovac region.
          Let&#39;s embark on our adventure of exploring the Benkovac Heritage Museum! This task will take you
          on a journey through a time portal, where you&#39;ll delve into the rich past of this town and uncover the
          secrets held within the museum&#39;s walls. Get ready for a fascinating exploration of local history, art,
          and culture that will enrich and inspire you!
          
          Visit the Museum and find the most unusual artifact there, and try to guess its purpose. Write your
          guess take a picture of it and upload it here. Then find out what it actually is and see how far off you
          were.`,
          userId: adminId,
          questId: questId,
          location: '{"latitude":"100","longitude":"100"}',
          disabled: false,
        },
        {
          id: st3,
          title: 'A wind rose - don’t get blown away, part 1',
          description: `In the hinterland of Zadar, southeast of Benkovac, there is one of the most important Liburnian, and
          later Roman settlements in the area - Asseria. How did Asseria become a real Roman municipium
          from a Liburnian settlement? The basis of the settlement’s prosperity is fertile soil, cattle breeding
          that made it possible to produce surpluses, a position on a hill that allows visibility over a large area,
          and most of all, a favorable traffic position. Asseria was located at the junction of the roads that
          came out of the city in a star pattern in all directions. That way, the coast was connected with the
          hinterland.
          
          There are different types of winds in the Dalmatian hinterland: 1. gale - dry, strong, and sudden wind
          that blows from the land towards the sea, mainly in the winter; 2. south wind - a warm wind that
          blows from the sea towards the land and most often brings precipitation with it; 3. mistral - daily
          thermal wind that blows from the northwest; and many more…
          Climb up the Asseria ruins and use a compass to determine what type of wind is currently blowing
          and then write your answer. It is highly unlikely that nothing is blowing the day you visit the ruins,
          but if it happens write that there is currently no wind.`,
          userId: adminId,
          questId: questId,
          location: '{"latitude":"100","longitude":"100"}',
          disabled: false,
        },
        {
          id: st4,
          title: 'A wind rose - don’t get blown away, part 2',
          description: `It is quite an easy task and we just wanted to remind you, in the words of Jimmy Dean, that you can’t
          change the direction of the wind, but you can adjust your sails to always reach your destination.
          So…go and travel and see the world. We want to hear about the best destination that the wind sent
          you. Describe it to us or share a photo.`,
          userId: adminId,
          questId: questId,
          location: '{"latitude":"100","longitude":"100"}',
          disabled: false,
        },
        {
          id: st5,
          title: 'Fresh from the heart of the community',
          description: `Centuries-old tradition has made the Benkovac Fair the center of the whole of Dalmatia every month.
          It is located outside the city center on a part of the land next to the main road.
          Favorable geographic location, agricultural resources, and people who traditionally live from
          agriculture and indigenous crafts are the main driving forces behind the development of the region.
          At the Fair, everything is buzzing with rustling, and with shouts of &quot;pošto kume&quot;, &quot;sold&quot;, and
          &quot;bought&quot;... everything is at the fair in Benkovac, including jokes and laughter. Coming to the
          Benkovac fair and not being seen, talking, and exchanging experiences with friends is the same as
          coming to Rome and not seeing the Pope.
          
          Visit the Benkovac fair on the 10th of the month and, like a real local, try your hand at bargaining. It
          doesn&#39;t matter what you buy... salad, tomatoes, toys, animals, flowers... the important thing is to get
          a good price and have fun doing it. Later, brag about your &quot;catch&quot; and share the picture on the app.`,
          userId: adminId,
          questId: questId,
          location: '{"latitude":"100","longitude":"100"}',
          disabled: false,
        },
      ]);

      await queryInterface.bulkInsert('questCategories', [
        {
          questId: questId,
          QuestId: questId,
          categoryId: gastroId,
          CategoryId: gastroId,
        },
        {
          questId: questId,
          QuestId: questId,
          categoryId: natureId,
          CategoryId: natureId,
        },
      ]);

      await queryInterface.bulkInsert('questStations', [
        {
          questId: questId,
          QuestId: questId,
          categoryId: gastroId,
          CategoryId: gastroId,
        },
        {
          questId: questId,
          QuestId: questId,
          categoryId: natureId,
          CategoryId: natureId,
        },
      ]);

      await transaction.commit();
    } catch (e) {
      console.log(e);
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
      await queryInterface.bulkDelete('quests', null, {
        transaction,
      });
      await queryInterface.bulkDelete('stations', null, {
        transaction,
      });
      await transaction.commit();
    } catch (e) {
      console.log(e)
      await transaction.rollback();
    }
  },
};
