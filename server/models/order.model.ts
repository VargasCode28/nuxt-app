import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

export interface IOrder extends Document {
  userId: string
  items: IOrderItem[]
  total: number
  status: 'pagado' | 'pendiente' | 'fallido'
  createdAt: Date
}

const orderItemSchema = new Schema<IOrderItem>({
  productId: { type: String, required: true },
  name: String,
  price: Number,
  quantity: Number
}, { _id: false })

const orderSchema = new Schema<IOrder>({
  userId: { type: String, required: true, index: true },
  items: { type: [orderItemSchema], default: [] },
  total: { type: Number, required: true },
  status: { type: String, enum: ['pagado', 'pendiente', 'fallido'], default: 'pendiente' },
  createdAt: { type: Date, default: Date.now }
})

export const OrderModel: Model<IOrder> =
  (mongoose.models.Order as Model<IOrder>) || mongoose.model<IOrder>('Order', orderSchema)