import app from '@/lib/firebase/server';
import sharp from 'sharp';
import {getStorage} from 'firebase-admin/storage';

const bucket = getStorage(app).bucket();

export default function Uploads(req, res) {
  if (req.method !== 'GET')
    return res.status(405).send('Method not allowed');

  const {path, w, q, h} = req.query;
  let transformOpts = {};

  const remote = bucket.file(path.join('/'));

  const transform = sharp().webp({
    quality: parseInt(q || '75')
  });

  if (w)
    transformOpts.width = parseInt(w);
  if (h)
    transformOpts.height = parseInt(h);

  const transformPipe = transform.resize(transformOpts);

  //Define Inmutable cache to Cloudflare Proxy
  res.setHeader('Cache-Control', 'public, s-maxage=31536000, immutable');

  remote
    .createReadStream()
    .pipe(transformPipe)
    .pipe(res);
}