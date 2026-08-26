import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProduct extends Document {
  name: string
  category: string
  price: string
  image?: string
  description?: string
  stock?: number
  createdAt: Date
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, default: '🪴' },
  description: { type: String, default: '' },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export const ProductModel: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) || mongoose.model<IProduct>('Product', productSchema)