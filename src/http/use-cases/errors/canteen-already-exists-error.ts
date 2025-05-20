export class CanteenAlreadyExistsError extends Error {
  constructor() {
    super(`Canteen already exists`)
  }
}
