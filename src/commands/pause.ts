import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';
import theme from '../utils/theme';

const data = {
  enabled: true,
  name: 'pause',
  description: 'Pause current track in the queue'
}

const handler = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.guild == null) {
    throw new Error('Guild is null, but it\'s required to handle command');
  }
  
  const queue = useQueue(interaction.guild.id);
  if (queue) {
    queue.node.pause();
    const embed = new EmbedBuilder()
      .setColor(theme.primaryColor)
      .setDescription('The track was paused 👽️')
      .setFooter({text: '💬 Hey next song DJ'});
    await interaction.reply({embeds: [embed]}); 
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(theme.primaryColor)
    .setDescription('The queue was already empty ⚠️')
    .setFooter({text: '💬 Are you sure about that?'});
  await interaction.reply({embeds: [embed]});
}

export default {
  ...data,
  handler
}
