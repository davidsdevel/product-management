import { createApi } from 'unsplash-js';

export default async function UnsplashAPI(req, res) {
  const {
    q,
    page,
    limit
  } = req.query;

  try {
    const serverApi = createApi({
      accessKey: process.env.UNSPLASH_KEY
    });

    const photos = await serverApi.search.getPhotos({
      query: q,
      page: page ? +page : 1,
      perPage: limit ? +limit : 10,
      orientation: 'landscape',
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
  } catch(err){
    if (err.message === 'expected JSON response from server.')
      return res.json({
        results: []
      });

    throw err;
  }
}
