import { Message } from 'discord.js';

import commands from '../commands';

const commandPrefix = '!';

const handler = async (message: Message<boolean>) => {
  if (message.author.bot || message.channel.type === 'DM' || !message.content.startsWith(commandPrefix)) {
    return;
  }
  const args = message.content
    .slice(commandPrefix.length)
    .split(/ +/g);
  const commandName = args.shift() as string;
  const command = commands[commandName];
  if (command) {
    command(message, args);
  }
}

export default {
  event: 'messageCreate',
  handler
}
