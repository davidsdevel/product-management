import { createSchema } from 'graphql-yoga';
import {categories, products} from '../deta/connection';
 
export default createSchema({
  typeDefs: /* GraphQL */ `
    type Category {
      name: String!
      image: String!
    }

    type Product {
      name: String!
      description: String!
      category: String!
      photo: String!
      price: Int!
    }

    type Query {
      categories: [Category!]
      products: [Product!]
    }


    type Mutation {
      createCategory(name: String!, image: String!): Category
      updateCategory(id:String!, name: String, image: String): Category
      deleteCategory(id: String!): Category
    }
  `,
  resolvers: {
    Query: {
      categories: async (_, _args, context) => {
        const response = await categories.fetch();

        return response.items;
      },
      products: async () => {
        const response = await products.fetch();

        return response.items;
      }
    },
    Mutation: {
      createCategory: async (_, _args, context) => {
        console.log(_args);

        return {
          name: 'hola',
          image: "url"
        }
      },
      updateCategory: async (_, _args, context) => {
        console.log(_args);

        return {
          name: 'hola',
          image: "url"
        }
      },
      deleteCategory: async (_, _args, context) => {
        console.log(_args);

        return {
          name: 'hola',
          image: "url"
        }
      }
    }
  }
});
