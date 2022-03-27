import dotenv from 'dotenv';

import { client as discord, login } from './services/discord';
import youtube from './services/youtube/v3';

interface YoutubeVideoListResponse {
    items: YoutubeVideo[];
}

interface YoutubeVideo {
    snippet: {
        title: string;
    },
    contentDetails: {
        duration: string;
    }
}

dotenv.config();

const commandPrefix = '!';

discord.on('ready', () => {
    console.log(`Logged in as ${discord.user?.tag}!`);
})

discord.on('messageCreate', async (message) => {
    if (message.author.bot || message.channel.type === 'DM' || !message.content.startsWith(commandPrefix)) {
        return;
    }
    const args = message.content
        .slice(commandPrefix.length)
        .split(/ +/g);
    const commandName = args.shift();
    switch (commandName) {
        case 'play':
            const [urlParameter] = args;
            try {
                const url = new URL(urlParameter);
                const allowedOrigins = ['https://music.youtube.com', 'https://www.youtube.com'];
                if (allowedOrigins.includes(url.origin) && '/watch' === url.pathname && url.searchParams.has('v')) {    
                    const params = {
                        part: ['snippet', 'contentDetails'],
                        id: url.searchParams.get('v'),
                        maxResults: 1
                    }
                    const { data } = await youtube.get<YoutubeVideoListResponse>('/videos', { params });
                    if (data.items.length > 0) {
                        const [video] = data.items;
                        const hours = video.contentDetails.duration.match(/(\d+)H/)?.at(1) ?? '0';
                        const minutes = video.contentDetails.duration.match(/(\d+)M/)?.at(1) ?? '0';
                        const seconds = video.contentDetails.duration.match(/(\d+)S/)?.at(1) ?? '0';
                        const duration = `${hours} hours, ${minutes} minutes and ${seconds} seconds`
                        message.reply(`Added to queue -> **${video.snippet.title}** _(${duration})_`);
                    }
                }
            } catch (error) {
                console.error(error);
            }
            break;
        default:
            break;
    }
});

login();
