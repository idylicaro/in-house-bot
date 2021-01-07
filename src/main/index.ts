import { config } from 'dotenv';
config();

import { ILogger, IBotConfig } from '../protocols/Bot';
const logger: ILogger = console;

import { Bot } from '../controllers/bot';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cfg = require('./../../bot.json') as IBotConfig;
cfg['token'] = process.env.BOT_TOKEN!;

const bot = new Bot(cfg, `${__dirname}/../commands`, `${__dirname}/../data`, logger);
bot.start();
console.log(bot.getAllUsers('752953160464859156'));
