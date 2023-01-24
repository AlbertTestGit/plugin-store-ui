export interface LicenseCodeResponse {
  licenseCode: string;
  expire: string;
}

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface JwtPayload {
  sub: string,
  username: string,
  role: string,
  iat: number,
  exp: number
}
