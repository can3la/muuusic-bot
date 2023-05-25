import { Guild } from 'discord.js';

import commands from '../commands';

const handler = async (guild: Guild) => {
  for (const {name, description, options} of Object.values(commands)) {
    await guild.commands.create({name, description, options});
  }
}

export default {
  name: 'guildCreate',
  handler
}
