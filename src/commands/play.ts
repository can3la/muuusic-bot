import { ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, GuildMember, ApplicationCommandOptionType } from 'discord.js';
import { QueryType } from 'discord-player';

import { player } from '../services/player';

const data = {
  name: 'play',
  description: 'Play a track or playlist by providing a link or search query',
  options: [
    {
      name: 'link-or-query',
      description: 'Link or search query',
      type: ApplicationCommandOptionType.String,
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
      .setColor('#f23f42')
      .setDescription('Ops... you must join a voice channel first 🙈')
      .setFooter({text: '💬 Please turn in and try again'});
    await interaction.reply({embeds: [embed]});
    return;
  }

  const linkOrQuery = interaction.options.getString('link-or-query', true);
  if (linkOrQuery.trim().length == 0) {
    throw new Error('Query is blank, but it\'s required to handle command');
  }

  await interaction.deferReply();

  await player.extractors.loadDefault();

  const searchResult = await player.search(linkOrQuery, {
    requestedBy: interaction.user,
    searchEngine: QueryType.AUTO,
  });

  if (!searchResult.hasTracks()) {
    const embed = new EmbedBuilder()
      .setColor('#f23f42')
      .setDescription('Ops... no tracks were found 🙈')
      .setFooter({text: '💬 Please check your link-or-query param'});
    await interaction.editReply({embeds: [embed]});
    return;
  }

  const tracks = searchResult.tracks.slice(0, 5);
  const actions = new ActionRowBuilder<ButtonBuilder>()
  let description = '';
  for (const [index, track] of tracks.entries()) {
    const number = index + 1;
    description += `${number}. ${track.title} - ${track.author} (${track.duration})\n`;
    const button = new ButtonBuilder()
      .setCustomId(track.url)
      .setLabel(`${number}`)
      .setStyle(ButtonStyle.Primary);
    actions.addComponents(button);
  }
  const embed = new EmbedBuilder()
    .setColor('#27282c')
    .setDescription(description)
    .setFooter({text: '💬 Please select one track to add to queue'});

  await interaction.editReply({ 
    embeds: [embed], 
    components: [actions] 
  })
}

export default {
  ...data,
  handler
}
