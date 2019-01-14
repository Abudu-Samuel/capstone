import CategoryModel from '../models/CategoryModel';
import CheatModel from '../models/CheatModel';
import seedData from './seederData';

export default async () => {
  try {
    const docCount = await CategoryModel.estimatedDocumentCount().exec();

    if (!docCount) {
      Object.keys(seedData).forEach(name => {
        const newCategory = new CategoryModel({ name });

        seedData[name].forEach(cheat => {
          const newCheat = new CheatModel({ ...cheat, category: newCategory._id });
          newCheat.save();
          newCategory.cheats.push(newCheat);
        });
        newCategory.save();
      });
      console.info('Database has been seeded successfully');
    } else console.info('Database has already been seeded');
  } catch (error) {
    throw new Error('An error occurred when seeding the database');
  }
};
