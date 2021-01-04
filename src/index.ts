import { config } from 'dotenv';
config();

import { Client } from 'discord.js';
const client: Client = new Client();

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.login(process.env.BOT_TOKEN);
