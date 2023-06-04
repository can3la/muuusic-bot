import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

const data = {
  enabled: true,
  name: 'stop',
  description: 'Stop and clear the queue'
}

const handler = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.guild == null) {
    throw new Error('Guild is null, but it\'s required to handle command');
  }
  
  const queue = useQueue(interaction.guild.id);
  if (queue) {
    queue.delete();
    const embed = new EmbedBuilder()
      .setColor('#27282c')
      .setDescription('The queue has been cleared, see you later! 👋')
      .setFooter({text: '💬 Time to stop the party'});
    await interaction.reply({embeds: [embed]}); 
    return;
  }

  const embed = new EmbedBuilder()
    .setColor('#27282c')
    .setDescription('The queue was already empty ⚠️')
    .setFooter({text: '💬 Are you sure about that?'});
  await interaction.reply({embeds: [embed]});
}

export default {
  ...data,
  handler
}
