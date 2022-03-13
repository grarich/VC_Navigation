import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { CommandInteraction } from 'discord.js';

export class ChangeActivityCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'change_activity',
      description: 'Botのアクティビティを変更します。',
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    if (interaction.user.id !== process.env.OWNER_ID) {
      return await interaction.reply('このコマンドは管理者のみ使用できます。');
    }
    const details = interaction.options.getString('details', false);
    if (details) {
      await this.container?.client?.user?.setActivity({
        name: details,
      });
    } else {
      await this.container?.client?.user?.setActivity({});
    }
    await interaction.reply('アクティビティを変更しました。');
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand(
      {
        name: this.name,
        description: this.description,
        options: [
          {
            name: 'details',
            description: 'Activityの詳細',
            type: 'STRING',
          },
        ],
      },
      { guildIds: [process.env.GUILD_ID!] }
    );
  }
}
