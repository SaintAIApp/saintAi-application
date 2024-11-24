export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  otp: number | undefined;
  otp_expire: Date | undefined;
}

export interface MineData {
  user_id: string;
  clock: number;
  coin_stt: number;
}
// export interface Wallet {
//   walledId: string;
// }
export interface Subscription {
  userId: string;
  plan: string;
  validUntil: Date;
  customerId: string;
}
export interface Upload {
  _id: string;
  userId: string;
  name: string;
  fileKey: string;
  fileUrl: string;
  createdAt: Date;
}
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  otp: number | undefined;
  otp_expire: Date | undefined;
}
export interface Wallet {
  walledId?: string;
  walletNetwork?: string | undefined;
}
