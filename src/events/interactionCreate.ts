import { CacheType, Interaction, GuildMember, EmbedBuilder } from 'discord.js';
import { QueryType } from 'discord-player';

import commands from '../commands';
import { player } from '../services/player';

const handler = async (interaction: Interaction<CacheType>) => {
  if (!interaction.isChatInputCommand()) {
    if (interaction.isButton() && interaction.inGuild()) {
      if (interaction.guild == null) {
        throw new Error('Guild is null, but it\'s required to handle command');
      }

      const guildMember = interaction.member as GuildMember;
      const voiceChannel = guildMember.voice.channel;
      if (voiceChannel == null) {
        const embed = new EmbedBuilder()
          .setColor('#f23f42')
          .setDescription('Ops... you must join a voice channel first 🙈')
          .setFooter({text: '💬 Please turn in and try again'});
        await interaction.reply({embeds: [embed]});
        return;
      }

      await interaction.deferReply();

      await player.extractors.loadDefault();

      const searchResult = await player.search(interaction.customId, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });
      
      if (searchResult.hasTracks()) {
        const queue = player.queues.create(interaction.guild);
        if (!queue.connection) {
          await queue.connect(voiceChannel);
        }
        const [track] = searchResult.tracks;
        queue.addTrack(track);

        if (!queue.isPlaying()) {
          queue.node.play();
        }

        const embed = new EmbedBuilder()
          .setColor('#27282c')
          .setDescription(`**${track.title} - ${track.author}** has been added to the queue.`)
          .setFooter({text: '🎧 Let\'s party cow 🐄'});
        await interaction.followUp({embeds: [embed]}); 
      }
    }
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
