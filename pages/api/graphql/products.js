import { createYoga } from 'graphql-yoga'
import schema from '../../../lib/graphql/schemas/products';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  }
}

export default createYoga({
  schema,
  multipart: false,
  graphqlEndpoint: '/api/graphql/products',
  cors: {
    origin: process.env.NEXT_PUBLIC_VERCEL_URL,
    methods: ['POST']
  }
});