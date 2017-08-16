export class BaseException extends Error {
  /**
     *
     */
  constructor(message?: string) {
    super();
  }
  static throw(message?: string) {
    throw new BaseException(message);
  }
}
