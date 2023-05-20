import { Client, IntentsBitField } from 'discord.js';

export const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]
});

export const login = () => {
  client.login(process.env.DISCORD_TOKEN);
}
