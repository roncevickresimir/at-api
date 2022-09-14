import { Model, Optional, UUID, UUIDV4 } from 'sequelize';

import { getCommonModelOptions } from '..';
import Quest from './Quest';
import Station from './Station';

/** all attributes in the Role model */
export interface IQuestStationRelation {
    id?: string;
    stationId: string;
    questId: string;
}

class QuestStationRelation
    extends Model<IQuestStationRelation>
    implements IQuestStationRelation
{
    public id?: string;
    public stationId: string;
    public questId: string;
}

export interface IQuestStationRelationCreate
    extends Optional<IQuestStationRelation, 'id'> {}

const modelOptions = getCommonModelOptions('Station_Quest_relation');

QuestStationRelation.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        stationId: {
            type: UUID,
            allowNull: false,
            unique: false,
        },
        questId: {
            type: UUID,
            allowNull: false,
            unique: false,
        },
    },
    {
        ...modelOptions,
    }
);

QuestStationRelation.belongsTo(Station, { foreignKey: 'stationId' });
Station.hasMany(QuestStationRelation, { foreignKey: 'stationId' });
QuestStationRelation.belongsTo(Quest, { foreignKey: 'questId' });
Quest.hasMany(QuestStationRelation, { foreignKey: 'questId' });

export default QuestStationRelation;
