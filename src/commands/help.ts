import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../protocols/Bot';

export default class HelpCommand implements IBotCommand {
  private readonly CMD_REGEXP = /^!help/g;
  private _bot!: IBot;

  public getHelp(): IBotCommandHelp {
    return { caption: '!help', description: 'This command.' };
  }

  public init(bot: IBot): void {
    this._bot = bot;
  }

  public isValid(msg: string): boolean {
    return this.CMD_REGEXP.test(msg);
  }

  public async process(msg: string, answer: IBotMessage): Promise<void> {
    answer.setTitle('List of supported commands::');
    for (const cmd of this._bot._commands) {
      const help = cmd.getHelp();
      if (help.caption) {
        answer.addField(help.caption, help.description);
      }
    }
  }
}
