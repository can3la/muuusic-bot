import { CacheType, ButtonInteraction, GuildMember, EmbedBuilder } from 'discord.js';

import theme from '../utils/theme';
import { addTrack, getTracksBy } from '../services/player';
import play from '../commands/play';

const handler = async (interaction: ButtonInteraction<CacheType>) => {
  if (interaction.guild == null) {
    throw new Error('Guild is null, but it\'s required to handle command');
  }
  const guildMember = interaction.member as GuildMember;
  const voiceChannel = guildMember.voice.channel;
  if (voiceChannel == null) {
    const embed = new EmbedBuilder()
      .setColor(theme.errorColor)
      .setDescription('You must join a voice channel first 🔊')
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

export default {
  isTriggedBy: play.name,
  handler
}
