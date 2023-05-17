import dotenv from 'dotenv';
import { client as discord, login } from './services/discord';

import hooks from './hooks';

dotenv.config();

hooks.forEach(({event, handler}) => discord.on(event, handler));

login();
