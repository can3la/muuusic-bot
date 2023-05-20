import { CacheType, Interaction } from 'discord.js';

import commands from '../commands';

const handler = async (interaction: Interaction<CacheType>) => {
  if (!interaction.isChatInputCommand()) {
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
