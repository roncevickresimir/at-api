import { Sequelize } from 'sequelize/types';

export const buildAssociations = (sequelize: Sequelize) => {
  const { User, Quest, UserQuest, Station, UserStation, Reward, UserReward, Category, QuestCategory } =
    sequelize.models;

  // User.hasMany(Quest, {
  //   foreignKey: {
  //     name: 'userId',
  //   },
  // });
  // Quest.belongsTo(User);

  // Quest.belongsToMany(User, { through: UserQuest });
  // User.belongsToMany(Quest, { through: UserQuest });
  // UserQuest.belongsTo(User);
  // User.hasMany(UserQuest);
  Quest.hasMany(UserQuest, { foreignKey: 'questId' });
  UserQuest.belongsTo(Quest, { foreignKey: 'questId' });

  // User.hasMany(Station);
  // Station.belongsTo(User);

  // Station.belongsToMany(User, { through: UserStation });
  // User.belongsToMany(Station, { through: UserStation });
  // UserStation.belongsTo(User);
  // User.hasMany(UserStation);
  Station.hasMany(UserStation, { foreignKey: 'stationId' });
  UserStation.belongsTo(Station, { foreignKey: 'stationId' });

  // User.hasMany(Reward);
  // Reward.belongsTo(User);

  // Reward.belongsToMany(User, { through: UserReward });
  // User.belongsToMany(Reward, { through: UserReward });
  // UserReward.belongsTo(User);
  // UserReward.belongsTo(Reward);
  // User.hasMany(UserReward);
  // Reward.hasMany(UserReward);

  // Quest.belongsToMany(Category, { through: QuestCategory });
  // Category.belongsToMany(Quest, { through: QuestCategory });
  // QuestCategory.belongsTo(Quest);
  // QuestCategory.belongsTo(Category);
  // Quest.hasMany(QuestCategory);
  // Category.hasMany(QuestCategory);

  Quest.hasMany(Station, { foreignKey: 'questId' });
  Station.belongsTo(Quest, { foreignKey: 'questId' });

  Quest.hasMany(Reward, { foreignKey: 'questId' });
  Reward.belongsTo(Quest, { foreignKey: 'questId' });
};
