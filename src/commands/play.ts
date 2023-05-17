import { Message } from 'discord.js';

const handler = async (message: Message<boolean>, args: string[]) => {
  const [urlParameter] = args;
  const duration = `0 hours, 23 minutes and 11 seconds`
  message.reply(`Added to queue -> **${urlParameter}** _(${duration})_`);
}

export default handler;
