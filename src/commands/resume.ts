import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';
import theme from '../utils/theme';

const data = {
  name: 'resume',
  description: 'Resume current paused track in the queue'
}

const handler = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.guild == null) {
    throw new Error('Guild is null, but it\'s required to handle command');
  }
  
  const queue = useQueue(interaction.guild.id);
  if (queue && queue.node.isPaused()) {
    if (queue.node.isPaused()) {
      queue.node.resume();
      const embed = new EmbedBuilder()
        .setColor(theme.primaryColor)
        .setDescription('Done, queue is playing now 👽️')
        .setFooter({text: '🎧 Let\'s party cow 🐄'});
      await interaction.reply({embeds: [embed]}); 
    } else {
      const embed = new EmbedBuilder()
        .setColor(theme.primaryColor)
        .setDescription('The queue was already playing ⚠️')
        .setFooter({text: '💬 Are you sure about that?'});
      await interaction.reply({embeds: [embed]});
    }
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
