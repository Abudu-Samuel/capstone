import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  cheats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'cheat'
    }
  ]
});

export default model('category', CategorySchema);
