import { Client } from 'discord.js';
import { IBot, IBotCommand, IBotConfig, ILogger, IUser } from '../protocols/Bot';
import { BotMessage } from './message';

export class Bot implements IBot {
  _client: Client;
  readonly _config: IBotConfig;
  _prefix: string;
  _commands: IBotCommand[] = [];
  _allUsers: IUser[] = [];
  _onlineUsers: IUser[] = [];
  _botId!: string;

  constructor(config: IBotConfig, commandsPath: string, dataPath: string) {
    this._config = config;
    this.loadCommands(commandsPath);
    this._prefix = '!';

    if (!this._config.token) {
      throw new Error('invalid discord token');
    }
    this._client = new Client();
    this._client.on('ready', () => {
      this._botId = this._client.user!.id;
      if (this._config.activity) {
        this._client.user!.setActivity(this._config.activity);
      }
      if (this._config.username && this._client.user!.username !== this._config.username) {
        this._client.user!.setUsername(this._config.username);
      }
      this._client.user!.setStatus('online');
      console.log('Started ...');
    });

    this._client.on('message', async (message) => {
      if (message.author.id !== this._botId) {
        const text = message.cleanContent;
        console.log(`[${message.author.tag}] ${text}`);
        for (const cmd of this._commands) {
          try {
            if (cmd.isValid(text)) {
              const answer = new BotMessage(message.author);
              await cmd.process(text, answer);
              if (answer.isValid()) {
                message.reply(answer.text || { embed: answer.richText });
              }
              break;
            }
          } catch (ex) {
            console.log(ex);
            return;
          }
        }
      }
    });
  }

  public start(): void {
    console.log('Bot logged!');
    this._client.login(this._config.token);
  }

  private async loadCommands(commandsPath: string) {
    if (!this._config.commands || !Array.isArray(this._config.commands) || this._config.commands.length === 0) {
      throw new Error('Invalid / empty commands list');
    }
    for (const cmdName of this._config.commands) {
      const cmdClass = (await import(`${commandsPath}/${cmdName}`)).default;
      const command = new cmdClass() as IBotCommand;
      command.init(this);
      this._commands.push(command);
      console.log(`command "${cmdName}" loaded...`);
    }
  }
}
