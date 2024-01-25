import { Category, CreateCategory } from '@api/models';

export class CategoryService {
  create = async (category: CreateCategory): Promise<Category | null> => {
    const result = await Category.create(category);
    return result;
  };
  getById = async (id: string): Promise<Category | null> => {
    return Category.findByPk(id);
  };

  getAll = async (): Promise<Category[] | null> => {
    return Category.findAll();
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await Category.destroy({
      where: {
        id: id,
      },
    });
    return !!result;
  };
}
