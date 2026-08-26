
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICartItem {
  productId: string
  name?: string
  price?: number
  image?: string
  quantity: number
}

export interface ICart extends Document {
  userId: string
  items: ICartItem[]
  updatedAt: Date
}

const cartItemSchema = new Schema<ICartItem>({
  productId: { type: String, required: true },
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1, min: 1 }
}, { _id: false })

const cartSchema = new Schema<ICart>({
  userId: { type: String, required: true, unique: true, index: true },
  items: { type: [cartItemSchema], default: [] },
  updatedAt: { type: Date, default: Date.now }
})

export const CartModel: Model<ICart> =
  (mongoose.models.Cart as Model<ICart>) || mongoose.model<ICart>('Cart', cartSchema)