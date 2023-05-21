import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.deezer.com'
});

interface Artist {
  name: string;
}

interface Track {
  title: string;
  link: string;
  preview: string;
  duration: string;
  artist: Artist;
}

interface SearchTrackByQueryResponse {
  data: Track[];
}

export const searchTrackBy = async (query: string) => {
  const {status, data} = await api.get<SearchTrackByQueryResponse>('/search/track', {params: {q: query}});
  if (status === 200) {
    return data.data;
  }
  throw new Error('Ops... something went wrong');
}
