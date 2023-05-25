import { Player } from 'discord-player';

import { client as discord } from './discord';

export const player = Player.singleton(discord);
