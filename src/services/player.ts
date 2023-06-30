import { Player, Track, QueryType } from 'discord-player';
import { VoiceBasedChannel, Interaction, RepliableInteraction, EmbedBuilder } from 'discord.js';

import { client as discord } from './discord';
import theme from '../utils/theme';
import { SpotifyExtractor, SoundCloudExtractor } from '@discord-player/extractor';

export const player = Player.singleton(discord);

export const getTracksBy = async (query: string, interaction: Interaction) => {
  if (!player.extractors.isRegistered(SpotifyExtractor.identifier)) {
    await player.extractors.register(SpotifyExtractor, {});
  }
  
  if (!player.extractors.isRegistered(SoundCloudExtractor.identifier)) {
    await player.extractors.register(SoundCloudExtractor, {});
  }

  return await player.search(query, {
    requestedBy: interaction.user,
    searchEngine: QueryType.AUTO,
  });
}

export const addTrack = async (track: Track, voiceChannel: VoiceBasedChannel, interaction: RepliableInteraction) => {
  const queue = player.queues.create(voiceChannel.guild, { 
    leaveOnEndCooldown: 180000, 
    leaveOnEmptyCooldown: 180000 
  });

  if (!queue.connection) {
    await queue.connect(voiceChannel);
  }
  
  queue.addTrack(track);
  if (!queue.isPlaying()) {
    queue.node.play();
  }

  const embed = new EmbedBuilder()
    .setColor(theme.primaryColor)
    .setDescription(`**${track.title} - ${track.author}** has been added to the queue.`)
    .setFooter({text: '🎧 Let\'s party cow 🐄'});
  await interaction.editReply({embeds: [embed]}); 
}
