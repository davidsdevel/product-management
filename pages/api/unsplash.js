import { createApi } from 'unsplash-js';

export default async function UnsplashAPI(req, res, query) {
  const {
    q,
    page,
    limit
  } = req.query;

  const serverApi = createApi({
    accessKey: process.env.UNSPLASH_KEY
  });

  const photos = await serverApi.search.getPhotos({
    query: q,
    page: page ? +page : 1,
    perPage: limit ? +limit : 10,
    lang: 'es'
  });

  const {response} = photos;

  response.results = response.results.map(e => {
    return {
      url: e.urls.regular,
      thumbnail: e.urls.thumb,
      raw: e.urls.raw,
      download: e.links.download_location
    };
  });

  res.json(response);
}
