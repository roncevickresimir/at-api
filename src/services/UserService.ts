import { startCase, toLower } from 'lodash';
import { Transaction } from 'sequelize';
import PageRpp from '../api/models/PageRpp';
import { EndUserCreate, UserCreate } from '../api/models/User';
import HashPassword from '../api/util/hashPassword';
import EndUser, {
    IEndUser,
    IEndUserCreate,
} from '../repository/models/EndUser';
import Role, { IRole } from '../repository/models/Role';
import User, { IUser, IUserCreate } from '../repository/models/User';

export default class UserService {
    GetByIdAsync = async (id?: string): Promise<IUser | null> => {
        return User.findByPk(id);
    };

    GetByEmailAsync = async (email: string): Promise<IUser | null> => {
        return User.findOne({
            where: {
                email: email,
            },
        });
    };

    GetByUserNameAsync = async (userName: string): Promise<IUser | null> => {
        return User.findOne({ where: { userName: userName } });
    };

    FetchAllUsers = async (filter?: PageRpp): Promise<IUser[] | null> => {
        if (typeof filter !== 'undefined') {
            return User.findAll({
                limit: filter.rpp,
                offset: (filter.page - 1) * filter.rpp,
            });
        } else return User.findAll();
    };

    CountAllUsers = async (): Promise<number> => {
        return User.count();
    };

    CreateUserAsync = async (
        user: UserCreate,
        transaction: Transaction,
        role: IRole
    ): Promise<User> => {
        user.firstName = startCase(toLower(user.firstName));
        user.lastName = startCase(toLower(user.lastName));

        const hashPassword = await HashPassword(user.password);

        const userCreate: IUserCreate = {
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashPassword,
            roleId: role.id,
        };

        const createdUser = await User.create(userCreate, { transaction });

        return createdUser;
    };

    CreateEndUserAsync = async (
        user: EndUserCreate,
        transaction: Transaction
    ): Promise<EndUser> => {
        const hashPassword = await HashPassword(user.password);

        const endUserCreate: IEndUserCreate = {
            username: user.username,
            email: user.email,
            password: hashPassword,
        };

        const createdUser = await EndUser.create(endUserCreate, {
            transaction,
        });

        return createdUser;
    };

    PostLoginAsync = async (
        userName?: string,
        email?: string
    ): Promise<IUser | null> => {
        if (userName)
            return User.findOne({
                where: {
                    userName: userName,
                },
                include: [
                    {
                        model: Role,
                    },
                ],
            });

        if (email)
            return User.findOne({
                where: {
                    email: email,
                },
                include: [
                    {
                        model: Role,
                    },
                ],
            });

        return null;
    };

    LoginEndUserAsync = async (
        username?: string,
        email?: string
    ): Promise<IEndUser | null> => {
        if (username)
            return EndUser.findOne({
                where: {
                    username: username,
                },
            });

        if (email)
            return EndUser.findOne({
                where: {
                    email: email,
                },
            });

        return null;
    };
}
