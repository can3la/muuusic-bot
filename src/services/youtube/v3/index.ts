import axios from 'axios';
import QueryString from 'qs';

const youtube = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
    params: {
        key: process.env.YOUTUBE_KEY
    },
    paramsSerializer: params => QueryString.stringify(params, { arrayFormat: 'repeat' })
});

export default youtube;
