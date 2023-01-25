export interface LicenseCodeResponse {
  licenseCode: string;
  expire: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface Plugin {
  id: number;
  name: string;
  petrelVersion: string;
  productKey: string;
  createdAt: Date;
}

export interface LoginResponse {
  access_token: string;
}

export interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export interface PluginShortInfo {
  productKey: string;
  name: string;
  unusedLicenses: number;
}

export interface UserLicenses {
  user: User;
  licenses: PluginShortInfo[];
}

export interface UpdateUserLicense {
  swid: string;
  userId: string;
  count: number;
}
