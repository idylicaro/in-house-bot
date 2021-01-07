import { DiscordAPIError } from 'discord.js';
import { Client } from 'discord.js';
import { IBotCommand, IBotConfig, IUser, ILogger } from './index';
export interface IBot {
  _logger: ILogger;
  _client: Client;
  _prefix: string;
  _commands: IBotCommand[];
  _allUsers: IUser[];
  _onlineUsers: IUser[];
  readonly _config: IBotConfig;
  _botId: string;
  start(): void;
}
