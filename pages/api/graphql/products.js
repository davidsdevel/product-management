import { createYoga } from 'graphql-yoga';
import schema from '../../../lib/graphql/schemas/products';

const isDev = process.env.NODE_ENV !== 'production';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  }
};

export default createYoga({
  schema,
  multipart: false,
  graphqlEndpoint: '/api/graphql/products',
  cors: req => {
    const requestOrigin = req.headers.get('origin');

    return {
      origin: requestOrigin,
      methods: ['POST']
    };
  }
});
