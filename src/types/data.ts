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