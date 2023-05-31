import { ChatInputCommandInteraction } from 'discord.js';

import play from './play';
import stop from './stop';
import skip from './skip';
import pause from './pause';
import resume from './resume';

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
  [play.name]: play,
  [stop.name]: stop,
  [skip.name]: skip,
  [pause.name]: pause,
  [resume.name]: resume
}

export default commands;
