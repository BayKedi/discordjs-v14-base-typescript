export default {
  name: 'ping',
  execute({ message }) {
    const ping = new Date(message.createdAt).getMilliseconds();

    message.channel.send(`🏓 Pong! ${ping}`);
  }
} as MessageCommand;