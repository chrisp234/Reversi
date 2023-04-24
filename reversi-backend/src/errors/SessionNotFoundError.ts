export class SessionNotFoundError extends Error {
  constructor(sessionToken: string) {
    super(`No session found for token ${sessionToken}`); // (1)
    this.name = "SessionNotFoundError"; // (2)
  }
}
