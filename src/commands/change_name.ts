import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';

export class ChangeNameCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'change_name',
      description: 'Botのユーザー名を変更します。',
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    if (interaction.user.id !== process.env.OWNER_ID) {
      return await interaction.reply('このコマンドは管理者のみ使用できます。');
    }
    const username = interaction.options.getString('username', true);
    await this.container?.client?.user?.setUsername(username);
    await interaction.reply('ユーザー名を変更しました。');
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand(
      {
        name: this.name,
        description: this.description,
        options: [
          {
            name: 'username',
            description: 'Botのユーザー名',
            type: 'STRING',
            required: true,
          },
        ],
      },
      { guildIds: [process.env.GUILD_ID!] }
    );
  }
}
