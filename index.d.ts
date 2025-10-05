import { ChatInputCommandInteraction, Message, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';

declare global {
  namespace NodeJS {
    // Adds .env intellisense
    interface ProcessEnv {
      TOKEN: string;
    }
  }
  type MessageCommandProps = {
    message: Message<true>;
    args: string[];
  }
  type MessageCommand = {
    name: string;
    execute({}: MessageCommandProps): void;
  }
  type SlashCommandProps = {
    interaction: ChatInputCommandInteraction;
  }
  type SlashCommand = {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody;
    execute({}: SlashCommandProps): void;
  }
}

export {};