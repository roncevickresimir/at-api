import { Op } from 'sequelize';

import { CreateStation, PageRpp } from '@api/dtos';
import { Station, User, UserStation } from '@api/models';

export class StationService {
  getById = async (id?: string): Promise<Station | null> => {
    return await Station.findOne({
      where: {
        id: id,
      },
    });
  };

  createStation = async (station: CreateStation): Promise<Station | null> => {
    return await Station.create(station);
  };

  completeStation = async (stationId: string, userId: string): Promise<any | null> => {
    return await UserStation.upsert({
      userId: userId,
      stationId: stationId,
      complete: true,
    });
  };

  getStationsByOwnerId = async (id?: string): Promise<number> => {
    if (typeof id !== 'undefined')
      return Station.count({
        where: {
          userId: id,
        },
      });
    else return Station.count();
  };

  countStationsByOwnerId = async (id?: string): Promise<number> => {
    if (typeof id !== 'undefined')
      return Station.count({
        where: {
          userId: id,
        },
      });
    else return Station.count();
  };

  getUserStations = async (userId: string): Promise<Station[] | null> => {
    let res = await UserStation.findAll({
      where: {
        userId: userId,
      },
      include: [{ model: Station }],
    });

    return res.map((i) => (i as any).Station as Station);
  };

  countUserStations = async (id: string): Promise<number> => {
    return UserStation.count({
      where: {
        userId: id,
      },
    });
  };

  countStationUsers = async (id: string): Promise<number> => {
    return UserStation.count({
      where: {
        stationId: id,
      },
    });
  };

  getStations = async (filter?: PageRpp): Promise<Station[] | null> => {
    if (typeof filter !== 'undefined') {
      const result = await Station.findAll({
        limit: filter.rpp,
        offset: (filter.page - 1) * filter.rpp,
        include: [
          {
            model: User,
          },
        ],
      });

      return result;
    } else
      return await Station.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
  };

  FetchStationsCountAsync = async (): Promise<number> => {
    return await Station.count();
  };

  deleteStation = async (id: string): Promise<boolean> => {
    const result = await Station.destroy({
      where: {
        id: id,
      },
    });

    return !!result;
  };

  editStation = async (station: CreateStation, id: string): Promise<boolean> => {
    const [result] = await Station.update(station, {
      where: {
        id: id,
      },
    });

    return result > 0;
  };

  disableStation = async (id: string, userId?: string): Promise<boolean> => {
    const [result] = await Station.update(
      {
        disabled: true,
      },
      {
        where: {
          id: id,
        },
      },
    );
    return result > 0;
  };

  enableStation = async (id: string): Promise<boolean> => {
    const [result] = await Station.update(
      {
        disabled: false,
      },
      {
        where: {
          id: id,
        },
      },
    );
    return result > 0;
  };

  FetchStationIdsFromIdArrayAsync = async (ids: Array<string>): Promise<Station[] | null> => {
    return await Station.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      attributes: ['id'],
    });
  };

  FetchStationsFromIdArrayAsync = async (ids: Array<string>): Promise<Station[] | null> => {
    return await Station.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  };
}
