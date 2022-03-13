import {
  ApplicationCommandRegistry,
  Command,
  CommandOptionsRunTypeEnum,
} from '@sapphire/framework';
import { CommandInteraction } from 'discord.js';

export class DisconnectCommand extends Command {
  constructor(context: Command.Context) {
    super(context, {
      runIn: CommandOptionsRunTypeEnum.GuildAny,
      name: 'disconnect',
      description: 'VCから切断します。',
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    if (interaction.user.id !== process.env.OWNER_ID) {
      return await interaction.reply('このコマンドは管理者のみ使用できます。');
    }
    await interaction.guild?.me?.voice.disconnect();
    await interaction.reply('VCから切断しました。');
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
