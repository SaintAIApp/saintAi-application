export interface IUser  {
    _id: string;
    username: string;
    email: string;
    password: string;
    isActive: boolean;
    otp: number | undefined;
    otp_expire: Date | undefined;
  }
export interface Wallet{
    walledId:string
}
export interface Subscription{
  userId: string;
  plan: string;
  validUntil: Date;
  customerId: string;
}
export interface Upload{
  _id:string
  userId: string;
    name: string;
    fileKey: string;
    fileUrl: string;
}