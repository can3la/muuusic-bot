import { Client } from 'discord.js';

const handler = (client: Client<true>) => {
  const now = new Date();
  console.log(`Bot started at ${now} [${client.user.tag}]`);
}

export default {
  name: 'ready',
  handler
}
