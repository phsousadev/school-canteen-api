import { Prisma, Order, OrderStatus } from '@prisma/client'
interface ProductCategory {
  id: string
  name: string
}

interface OrderItemProduct {
  id: string
  name: string
  price: Prisma.Decimal
  category: ProductCategory
}

interface OrderItemResponse {
  id: string
  quantity: number
  unitPrice: Prisma.Decimal
  product: OrderItemProduct
}

interface OrderUser {
  id: string
  name: string
  email: string
  phone: string
}

export interface OrderResponse {
  id: string
  status: 'PENDING' | 'IN_PREPARATION' | 'READY' | 'DELIVERED'
  user: OrderUser
  items: OrderItemResponse[]
  createdAt: Date
  updatedAt: Date
}

export interface OrdersRepository {
  create(data: Prisma.OrderCreateInput): Promise<Order>
  findById(id: string): Promise<Order | null>
  listOrders(userId?: string, status?: OrderStatus): Promise<OrderResponse[]>
}
