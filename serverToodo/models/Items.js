import mongoose from 'mongoose';

const ItemsSchema = new mongoose.Schema(
  {
    // Автоматическое поле _id создается само, не нужно добавлять
    nameWeapon: {
      type: String,
      required: true,
      trim: true, // удаляет лишние пробелы
    },
    nameSkin: {
      type: String,
      required: true,
      trim: true,
    },
    linkImg: {
      type: String,
      default: '', // ← исправь "defaul" на "default"
      required: true, // лучше сделать обязательным
    },
    color: {
      type: String,
      default: '#000000', // цвет по умолчанию (черный)
      required: true,
    },
    glowColor: {
      type: String,
      default: '#000000', // цвет по умолчанию (черный)
      required: true,
    },
    glowRgb: {
      type: String,
      default: '#000000', // цвет по умолчанию (черный)
      required: true,
    },
    rarity: {
      // редкость (для сортировки)
      type: String,
      enum: ['common', 'rare', 'epic', 'legendary'],
      default: 'common',
    },
    price: {
      // цена (для весов в рулетке)
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Индексы для быстрого поиска
ItemsSchema.index({ rarity: 1, price: -1 });

export default mongoose.model('Items', ItemsSchema);
