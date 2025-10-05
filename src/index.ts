import { Client, GatewayIntentBits, Partials, REST, Routes } from 'discord.js';
import fs from 'fs';

const client = new Client({
  // Uses every intent
  intents: Object.keys(GatewayIntentBits).map(intents => GatewayIntentBits[intents]),
  // Uses every partial [OPTIONAL]
  partials: Object.keys(Partials).map(partials => Partials[partials])
});

// Event handler
fs.readdirSync('./events').filter(file => file.endsWith('.ts'))
.forEach(async file => {
  const eventName = file.replace('.ts', '');
  const event = await import(`${import.meta.dirname}/events/${file}`);
  // Uses default() because of default export
  client.on(eventName, (...args) => event.default(...args))
});

// Handler for ChatInput Commands
const commands = [];

fs.readdirSync('./commands/').filter(file => file.endsWith('.ts'))
.forEach(async file => {
  const command = await import(`./commands/chatInput/${file}`);
  const commandData = command.default.data;
  commands.push(commandData);
})

client.login(process.env.TOKEN)
.then(async () => {
  // Command registration
  const rest = new REST().setToken(client.token);

  await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
})