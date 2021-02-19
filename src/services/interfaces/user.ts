import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username?: string;
  spotify_id: string;
  displayName?: string;
  photo?: string;
  profileUrl?: string;
  refreshToken: string;
  comparePassword(password: string): boolean;
}

export interface Idecoded {
  email?: string;
  id?: string;
  jti?: string;
  iat?: number;
  exp?: number;
}


export interface IReqUser {
    user: {}
    accessToken: string,
    refreshToken:string
}
