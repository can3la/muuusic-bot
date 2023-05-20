import { Guild } from 'discord.js';

import commands from '../commands';

const handler = async (guild: Guild) => {
  console.log(`Joined a new guild: ${guild.id}`)
  for (const {name, description, options} of Object.values(commands)) {
    await guild.commands.create({name, description, options});
  }
}

export default {
  name: 'guildCreate',
  handler
}
