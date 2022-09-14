import { Transaction } from "sequelize/types";
import PageRpp from "../api/models/PageRpp";
import Region, { IRegion } from "../repository/models/Region";

export default class RegionService {
    GetByIdAsync = async (id: string): Promise<IRegion | null> => {
        return Region.findOne({
            where: {
                id: id,
            }
        });
    };

    FetchAllAsync = async (filter?: PageRpp): Promise<IRegion[] | null> => {

        if (typeof filter !== 'undefined') {
            return Region.findAll({
                limit: filter.rpp,
                offset: (filter.page - 1) * filter.rpp,
            });
        } else
            return Region.findAll();
    };

    CountAllAsync = async (id?: string): Promise<number> => {

        return Region.count();
    };

    PostRegionAsync = async (region: IRegion, transaction: Transaction): Promise<IRegion | null> => {

        const result = await Region.create(region, { transaction });

        return result;
    };

    PutRegionAsync = async (id: string, region: IRegion, transaction: Transaction): Promise<boolean> => {


        const result = await Region.update(region, {
            where: {
                id: id,
            },
            transaction: transaction
        });

        return result[0] > 0 ? true : false;
    };

    DeleteRegionAsync = async (id: string): Promise<boolean> => {

        const reward: any = await this.GetByIdAsync(id);

        if (!reward)
            return false;


        const result = await Region.destroy({
            where: {
                id: id,
            },
        });

        return result > 0 ? true : false;
    };

};