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
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql/products',
});
