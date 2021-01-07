import { IUser } from './IUser';

type MessageColor = [number, number, number] | number | string;

export interface IBotMessage {
  readonly user: IUser;
  setTextOnly(text: string): IBotMessage;
  addField(name: string, value: string): IBotMessage;
  addBlankField(): IBotMessage;
  setColor(color: MessageColor): IBotMessage;
  setDescription(description: string): IBotMessage;
  setFooter(text: string, icon?: string): IBotMessage;
  setImage(url: string): IBotMessage;
  setThumbnail(url: string): IBotMessage;
  setTitle(title: string): IBotMessage;
  setURL(url: string): IBotMessage;
}
