import { Op, Transaction } from 'sequelize';
import PageRpp from '../api/models/PageRpp';
import EndUserStation, {
    IEndUserStation,
    IEndUserStationCreate,
} from '../repository/models/EndUserStation';
import Image from '../repository/models/Image';
import User from '../repository/models/User';
import UserService from './UserService';

export default class EndUserStationService {
    private _userService = new UserService();

    GetByIdAsync = async (id?: string): Promise<IEndUserStation | null> => {
        return await EndUserStation.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Image,
                },
                {
                    model: User,
                },
            ],
        });
    };

    CreateEndUserStationAsync = async (
        EndUserstation: IEndUserStationCreate,
        transaction: Transaction
    ): Promise<IEndUserStation | null> => {
        return await EndUserStation.create(EndUserstation, { transaction });
    };

    CountAllByUserIdAsync = async (id?: string): Promise<number> => {
        if (typeof id !== 'undefined')
            return EndUserStation.count({
                where: {
                    userId: id,
                },
            });
        else return EndUserStation.count();
    };

    DeleteEndUserStationAsync = async (id: string): Promise<boolean> => {
        const result = await EndUserStation.destroy({
            where: {
                id: id,
            },
        });

        return result ? true : false;
    };
}
