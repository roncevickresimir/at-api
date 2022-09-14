import Role, { IRole } from '../repository/models/Role';

export default class RoleService {
    GetByIdAsync = async (id?: string): Promise<IRole | null> => {
        return Role.findByPk(id);
    };

    GetByAbrvAsync = async (abrv: string): Promise<IRole | null> => {
        return Role.findOne({ where: { abrv } });
    };

    FetchAllRoles = async (): Promise<IRole[] | null> => {
        return Role.findAll();
    };

}
