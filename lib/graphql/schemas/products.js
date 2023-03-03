import {createSchema} from 'graphql-yoga';
import {products} from '../../deta/connection';
 
//Queries handlers
function getProduct(key) {
  return products.get(key);
}

async function getAllProducts() {
  const {items} = await products.fetch();

  return items;
}

async function getProductsByCategory(category) {
  const {items} = await products.fetch({category});

  return items;
}

//Mutations
function createProduct(data) {
  return products.put(data);
}

function updateProduct(key, data) {
  delete data.key;

  return products.update(data, key);
}

async function deleteProduct(key) {
  await products.delete(key);
  
  return key;
}


export default createSchema({
  typeDefs: /* GraphQL */ `
    type Product {
      key: String!
      name: String!
      description: String!
      category: String!
      photo: String!
      price: Int!
    }

    type Query {
      products: [Product!]
      product(key: String!): Product
      productsByCategory(category: String!): [Product]
    }

    type Mutation {
      createProduct(
        name: String!,
        description: String!,
        category: String!,
        photo: String!,
        price: Int!
      ): Product

      updateProduct(
        key:String!,
        name: String,
        description: String,
        category: String,
        photo: String,
        price: Int
      ): String

      deleteProduct(key: String!): String
    }
  `,
  resolvers: {
    Query: {
      products: async () => {
        return await getAllProducts();
      },
      product: async (_, _args) => {
        const {key} = _args;

        return await getProduct(key);
      },
      productsByCategory: async (_, _args) => {
        const {category} = _args;

        return await getProductsByCategory(category);
      }
    },
    Mutation: {
      createProduct: async (_, _args, context) => {
        return await createProduct(_args);
      },
      updateProduct: async (_, _args, context) => {
        const {key} = _args;

        await updateProduct(key, _args);

        return key;
      },
      deleteProduct: async (_, _args, context) => {
        const {key} = _args;

        return await deleteProduct(key);
      }
    }
  }
});
