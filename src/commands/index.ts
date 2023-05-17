import { Message } from 'discord.js';
import play from './play';

interface Commands {
  [key: string]: (message: Message<boolean>, args: string[]) => Promise<void>
}

const commands: Commands = {
  play
}

export default commands;
