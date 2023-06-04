import { Player, Track, QueryType } from 'discord-player';
import { VoiceBasedChannel, Interaction, RepliableInteraction, EmbedBuilder } from 'discord.js';

import { client as discord } from './discord';
import theme from '../utils/theme';

export const player = Player.singleton(discord);

export const getTracksBy = async (query: string, interaction: Interaction) => {
  await player.extractors.loadDefault();
  return await player.search(query, {
    requestedBy: interaction.user,
    searchEngine: QueryType.AUTO,
  });
}

export const addTrack = async (track: Track, voiceChannel: VoiceBasedChannel, interaction: RepliableInteraction) => {
  // const queue = player.queues.create(voiceChannel.guild);
  // if (!queue.connection) {
  //   await queue.connect(voiceChannel);
  // }
  
  // queue.addTrack(track);
  // if (!queue.isPlaying()) {
  //   queue.node.play();
  // }

  const embed = new EmbedBuilder()
    .setColor(theme.primaryColor)
    .setDescription(`**${track.title} - ${track.author}** has been added to the queue.`)
    .setFooter({text: '🎧 Let\'s party cow 🐄'});
  await interaction.editReply({embeds: [embed]}); 
}
