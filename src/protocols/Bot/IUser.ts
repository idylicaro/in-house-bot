export interface IUser {
  [x: string]: any;
  id: string;
  username: string;
  discriminator: string;
  tag: string;
}
