export class CartNotfoundAndNotRemoval extends Error {
  constructor() {
    super(
      'Cart item or cart not found for removal or cart item or cart not found for update.',
    )
  }
}
