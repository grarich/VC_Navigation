import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
} from '@discordjs/voice';
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptionsRunTypeEnum,
} from '@sapphire/framework';
import { CommandInteraction, VoiceChannel } from 'discord.js';

export class ConnectCommand extends Command {
  constructor(context: Command.Context) {
    super(context, {
      runIn: CommandOptionsRunTypeEnum.GuildAny,
      name: 'connect',
      description: 'ボイスチャンネルに接続します。',
    });
  }

  async chatInputRun(interaction: CommandInteraction) {
    if (interaction.user.id !== process.env.OWNER_ID) {
      return await interaction.reply('このコマンドは管理者のみ使用できます。');
    }
    const voiceChannel = interaction.options.getChannel(
      'voice_channel',
      true
    ) as VoiceChannel;
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guildId!,
      selfDeaf: true,
      adapterCreator: interaction.guild!
        .voiceAdapterCreator as DiscordGatewayAdapterCreator,
    });

    await interaction.reply('VCに接続しました。');
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand(
      {
        name: this.name,
        description: this.description,
        options: [
          {
            name: 'voice_channel',
            channelTypes: ['GUILD_VOICE'],
            description: '接続するボイスチャンネル',
            type: 'CHANNEL',
            required: true,
          },
        ],
      },
      { guildIds: [process.env.GUILD_ID!] }
    );
  }
}
