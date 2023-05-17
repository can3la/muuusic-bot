import { client as discord } from './../services/discord';

const handler = () => {
  console.log(`Logged in as ${discord.user?.tag}!`);
}

export default {
  event: 'ready',
  handler
}
