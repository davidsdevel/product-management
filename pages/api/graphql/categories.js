import { createYoga } from 'graphql-yoga'
import schema from '../../../lib/graphql/schemas/categories';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  }
}

export default createYoga({
  schema,
  multipart: false,
  graphqlEndpoint: '/api/graphql/categories',
  cors: {
    origin: [process.env.NEXT_PUBLIC_VERCEL_URL, 'ferreteria-revision.vercel.app'],
    methods: ['POST']
  }
});
