# Muuusic Bot

A Discord Bot to listen high quality music in your server for free

![A cow dancing a music, its using a headphones](./assets/bot_avatar.png)

# Usage

Invite Muuusic Bot to your Discord Guild and that's it.

## Slash Commands

### `/play`

Play a track or playlist by providing a link or search query

**Parameters**:

- link-or-query: 
  - **description**: Link or search query parameter
  - **required**: `true`

### `/stop`

Stop and clear the queue

# Development

- Clone repository 

```shell
git clone git@github.com:gustavo-flor/muuusic-bot.git && cd muuusic-bot
```

- Clone `.env.example` to `.env`

```shell
cp .env.example .env
```

- Adjust external tokens on `.env`

- Run muuusic bot locally

```shell
npm run dev
```
