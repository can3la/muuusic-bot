import { Client, Intents } from "discord.js";

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

export const login = () => {
  client.login(process.env.DISCORD_TOKEN);
}
