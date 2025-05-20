export class ProductNotFoundError extends Error {
  constructor(productId?: string) {
    super(`Product${productId ? ` with ID ${productId}` : ''} not found`)
  }
}
