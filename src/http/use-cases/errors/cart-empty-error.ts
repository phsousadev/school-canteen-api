export class CartEmptyError extends Error {
  constructor() {
    super('Cart is empty. Add items before checking out.')
  }
}
