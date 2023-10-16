/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

// export type UserName = {
//   firstName: string;
//   lastName: string;
// };

export type IUser = {
  _id?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  address?: string;
  role?: string;
  dob?: string;
  gender?: string;
  profileImg?: string;
  preferences: {
    Language?: string;
    nationality?: string;
  };
  cart?: string[];
};

export type IUserResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: IUser[];
};
export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
