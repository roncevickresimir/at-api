import PageRpp from '../api/models/PageRpp';
import Category, { ICategory } from '../repository/models/Category';

export default class CategoryService {
    GetByIdAsync = async (id: string): Promise<ICategory | null> => {
        return Category.findByPk(id);
    };

    FetchAllAsync = async (): Promise<ICategory[] | null> => {
        return Category.findAll();
    };

    PostCategoryAsync = async (
        category: ICategory
    ): Promise<ICategory | null> => {
        const result = await Category.create(category);
        return result;
    };

    DeleteCategoryAsync = async (id: string): Promise<boolean> => {
        const result = await Category.destroy({
            where: {
                id: id,
            },
        });
        return result > 0 ? true : false;
    };
}
