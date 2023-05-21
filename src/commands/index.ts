import { ChatInputCommandInteraction } from 'discord.js';

import play from './play';
import stop from './stop';

interface Option {
  type: number;
  name: string;
  description: string;
  required: boolean;
}

interface Command {
  name: string;
  description: string;
  handler: (interaction: ChatInputCommandInteraction) => Promise<void>;
  options?: Option[];
}

interface Commands {
  [key: string]: Command
}

const commands: Commands = {
  play,
  stop
}

export default commands;
