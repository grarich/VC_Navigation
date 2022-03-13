import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';

export class ChangeNickCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'change_nick',
      description: 'Botのニックネームを変更します。',
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    if (interaction.user.id !== process.env.OWNER_ID) {
      return await interaction.reply('このコマンドは管理者のみ使用できます。');
    }
    const nickname = interaction.options.getString('nickname', false);
    await interaction.guild?.me?.setNickname(nickname);
    await interaction.reply('ニックネームを変更しました。');
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand(
      {
        name: this.name,
        description: this.description,
        options: [
          {
            name: 'nickname',
            description: 'Botのニックネーム',
            type: 'STRING',
          },
        ],
      },
      { guildIds: [process.env.GUILD_ID!] }
    );
  }
}
