import fs from 'fs';
import { prefix } from 'src/config';

export default async (message: import('discord.js').Message) => {
  if (!message.inGuild()) return; // intellisense
  // Message Command Handler
  fs.readdirSync(`${import.meta.dirname}/../commands`).filter(file => file.endsWith('.ts'))
  .forEach(async file => {
    const command = await import(`../commands/${file}`);
    const commandName = message.content.split(' ')[0].slice(prefix.length);
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if (commandName === command.default.name) command.default.execute({ message, args });
  })
};