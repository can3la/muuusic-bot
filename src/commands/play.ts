import { ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, GuildMember, ApplicationCommandOptionType } from 'discord.js';

import { addTrack, getTracksBy } from '../services/player';
import theme from '../utils/theme';

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
      .setColor(theme.errorColor)
      .setDescription('Ops... you must join a voice channel first 🔊')
      .setFooter({text: '💬 Please turn in and try again'});
    await interaction.reply({embeds: [embed]});
    return;
  }

  const linkOrQuery = interaction.options.getString('link-or-query', true).trim();
  if (linkOrQuery.length == 0) {
    throw new Error('Query is blank, but it\'s required to handle command');
  }

  await interaction.deferReply();

  const searchResult = await getTracksBy(linkOrQuery, interaction);

  if (!searchResult.hasTracks()) {
    const embed = new EmbedBuilder()
      .setColor(theme.errorColor)
      .setDescription('Ops... no tracks were found 🙈')
      .setFooter({text: '💬 Please check your link-or-query param'});
    await interaction.editReply({embeds: [embed]});
    return;
  }

  if (searchResult.tracks.length == 1) {
    const [track] = searchResult.tracks;
    await addTrack(track, voiceChannel, interaction);
    return;
  }

  const topFiveTracks = searchResult.tracks.slice(0, 5);

  const actions = new ActionRowBuilder<ButtonBuilder>()
  let description = '';
  for (const [index, track] of topFiveTracks.entries()) {
    const key = `${index + 1}`;
    description += `${key}. ${track.title} - ${track.author} (${track.duration})\n`;
    const button = new ButtonBuilder()
      .setCustomId(track.url)
      .setLabel(key)
      .setStyle(ButtonStyle.Primary);
    actions.addComponents(button);
  }

  const embed = new EmbedBuilder()
    .setColor(theme.primaryColor)
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
