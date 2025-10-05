import { ApplicationIntegrationType, InteractionContextType } from 'discord.js';

export default {
  data: {
    name: 'ping',
    description: 'Ping Command',
    contexts: [
      InteractionContextType.Guild,
      InteractionContextType.BotDM,
      InteractionContextType.PrivateChannel
    ],
    integration_types: [
      ApplicationIntegrationType.GuildInstall,
      ApplicationIntegrationType.UserInstall
    ]
  },
  async execute({ interaction }) {
    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.reply(`🏓 Pong! ${ping}`);
  },
} as SlashCommand;