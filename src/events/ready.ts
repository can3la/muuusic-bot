import { Client } from 'discord.js';

const handler = (client: Client<true>) => {
  const now = new Date();
  console.log(`${client.user.tag} started at ${now}`);
}

export default {
  name: 'ready',
  handler
}
