export class InvalidAuthError extends Error {
  constructor() {
    super('Auth failed.'); // (1)
    this.name = "InvalidAuthError"; // (2)
  }
}
