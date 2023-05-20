import { ChatInputCommandInteraction, EmbedBuilder, GuildMember } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

import { searchTrackBy } from '../services/deezer';

const data = {
  name: 'play',
  description: 'Play a track or playlist by providing a link or search query',
  options: [
    {
      name: 'link-or-query',
      description: 'Link or search query',
      type: 3,
      required: true
    }
  ]
}

const handler = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.guild == null) {
    throw new Error('Guild is null, but it\'s required to handle command');
  }
  
  const guildMember = interaction.member as GuildMember;
  const voiceChannel = guildMember.voice.channel;
  if (voiceChannel == null) {
    const embed = new EmbedBuilder()
      .setColor('#f51224')
      .setDescription('Ops... you must join a voice channel first 🙈')
      .setFooter({text: '💬 Please turn in and try again'});
    await interaction.reply({embeds: [embed]});
    return;
  }

  const [{value: linkOrQuery}] = interaction.options.data;
  if (linkOrQuery == undefined || typeof linkOrQuery != 'string') {
    throw new Error('Query is invalid, but it\'s required to handle command');
  }

  const tracks = await searchTrackBy(linkOrQuery);
  if (tracks.length == 0) {
    const embed = new EmbedBuilder()
      .setColor('#f51224')
      .setDescription('Ops... any track was found 🙈')
      .setFooter({text: '💬 Please check your link-or-query param'});
    await interaction.reply({embeds: [embed]});
    return;
  }

  joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator
  });
  
  const [track] = tracks;
  const embed = new EmbedBuilder()
    .setColor('#27282c')
    .setDescription(`**${track.title}** has been added to the queue.`)
    .setFooter({text: '🎧 Let\'s party cow 🐄'});
  await interaction.reply({embeds: [embed]});
}

export default {
  ...data,
  handler
}
