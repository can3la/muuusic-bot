import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

const data = {
  name: 'skip',
  description: 'Skip current track in the queue'
}

const handler = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.guild == null) {
    throw new Error('Guild is null, but it\'s required to handle command');
  }
  
  const queue = useQueue(interaction.guild.id);
  if (queue) {
    queue.node.skip();
    const embed = new EmbedBuilder()
      .setColor('#27282c')
      .setDescription('The track was skiped 👽️')
      .setFooter({text: '💬 Hey next song DJ'});
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
