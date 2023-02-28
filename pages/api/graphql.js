import { createYoga } from 'graphql-yoga'
import schema from '@/lib/graphql/schema';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  }
}

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
});