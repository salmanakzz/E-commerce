export const ERRORS = {
  INTERNAL_SERVER: {
    code: 500,
    message: "Internal Server Error",
  },
  INVALID_CREDS: {
    code: 400,
    message: "Invalid Creds",
  },
};

export enum RESPONSE_TYPES {
  JSON = "json",
  REDIRECT = "redirect",
  NULL = "null",
}

export interface ErrorType {
  statusCode: number;
  message: string;
}
