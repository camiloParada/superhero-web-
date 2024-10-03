export class User {
  access_token!: string;
  user!: UserInfo;
}

export class UserInfo {
  id!: string;
  firstname!: string;
  lastname!: string;
  email!: string;
  avatar!: string;
  activationHash!: string;
  expirationHash!: string;
  status!: string;
  lastLogin!: Date;
  createdAt!: Date;
  updatedAt!: Date;
  role!: Role;
}

export class Role {
  id!: number;
  name!: string;
  status!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
