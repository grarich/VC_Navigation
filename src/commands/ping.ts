import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';

export class PingCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'ping',
      description: 'BotのWebSocketの遅延を表示します。',
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    await interaction.reply({
      content: `Pong! 🏓 Latency ${Math.round(
        this.container.client.ws.ping
      )}ms.`,
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand(
      {
        name: this.name,
        description: this.description,
      },
      { guildIds: [process.env.GUILD_ID!] }
    );
  }
}
