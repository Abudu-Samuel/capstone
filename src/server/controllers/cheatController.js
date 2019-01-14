import Category from '../models/CategoryModel';
import dataResponse from '../helpers/dataResponse';

export default async (req, res) => {
  try {
    const categoriesWithCheats = await Category.find()
      .populate({ path: 'cheats', model: 'cheat', select: 'description command keywords' })
      .exec();

    return dataResponse.success(
      res,
      200,
      'Retrieved all categories with cheats',
      categoriesWithCheats
    );
  } catch (error) {
    return dataResponse.error(res, 500, dataResponse.generalError);
  }
};
