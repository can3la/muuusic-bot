import { CacheType, Interaction, GuildMember, EmbedBuilder } from 'discord.js';

import commands from '../commands';
import { addTrack, getTracksBy } from '../services/player';
import theme from '../utils/theme';

const handler = async (interaction: Interaction<CacheType>) => {
  if (!interaction.inGuild()) {
    return;
  }

  if (interaction.isButton()) {
    if (interaction.guild == null) {
      throw new Error('Guild is null, but it\'s required to handle command');
    }

    const guildMember = interaction.member as GuildMember;
    const voiceChannel = guildMember.voice.channel;
    if (voiceChannel == null) {
      const embed = new EmbedBuilder()
        .setColor(theme.errorColor)
        .setDescription('Ops... you must join a voice channel first 🔊')
        .setFooter({text: '💬 Please turn in and try again'});
      await interaction.reply({embeds: [embed]});
      return;
    }

    await interaction.deferReply();

    const searchResult = await getTracksBy(interaction.customId, interaction);
    
    if (searchResult.hasTracks()) {
      const [track] = searchResult.tracks;
      await addTrack(track, voiceChannel, interaction);
    }
  }

  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = commands[interaction.commandName];
  if (command) {
    command.handler(interaction);
  }
}

export default {
  name: 'interactionCreate',
  handler
}
