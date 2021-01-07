import { IBot, IBotMessage } from './index';

export interface IBotCommandHelp {
  caption: string;
  description: string;
}
export interface IBotCommand {
  getHelp(): IBotCommandHelp;
  init(bot: IBot, dataPath?: string): void;
  isValid(msg: string): boolean;
  process(msg: string, answer: IBotMessage): Promise<void>;
}
