import { CacheType, Interaction, GuildMember, EmbedBuilder } from 'discord.js';

import commands from '../commands';
import { addTrack, getTracksBy } from '../services/player';
import theme from '../utils/theme';
import hooks from '../hooks';

const handler = async (interaction: Interaction<CacheType>) => {
  if (!interaction.inGuild()) {
    return;
  }

  if (interaction.isButton()) {
    if (interaction.message.interaction === null) {
      return;
    }
    const hook = hooks[interaction.message.interaction.commandName];
    if (hook) {
      hook(interaction);
    }
  }

  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = commands[interaction.commandName];
  if (command && command.enabled) {
    command.handler(interaction);
  }
}

export default {
  name: 'interactionCreate',
  handler
}
