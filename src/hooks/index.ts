import { ButtonInteraction } from 'discord.js';

import onSelectMusic from './onSelectMusic';

interface Hooks {
  [key: string]: (interaction: ButtonInteraction) => Promise<void>;
}

const hooks: Hooks = {
  [onSelectMusic.isTriggedBy]: onSelectMusic.handler
}

export default hooks;
