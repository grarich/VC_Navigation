import { Command } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';

export class ChangeAvatarCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'change_avatar',
      description: 'Botのアイコンを変更します。',
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    if (interaction.user.id !== process.env.OWNER_ID) {
      return await interaction.reply('このコマンドは管理者のみ使用できます。');
    }
    await interaction.reply(
      'この機能は利用できません。ライブラリが更新されるまでお待ち下さい。'
    );
    /*
    const avatar = interaction.options.getAttachment('avatar', true).attachment;
    await this.container?.client?.user?.setAvatar(avatar);
    await interaction.reply('アイコンを変更しました。');
    */
  }

  /*
  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand(
      {
        name: this.name,
        description: this.description,
        options: [
          {
            name: 'avatar',
            description: 'Botのアイコン',
            type: 'STRING',
            required: true,
          },
        ],
      },
      { guildIds: [process.env.GUILD_ID!] }
    );
  }
  */
}
