import dotenv from 'dotenv';
import { client as discord, login } from './services/discord';

import events from './events';

dotenv.config();

events.forEach(event => discord.on(event.name, event.handler));

login();
