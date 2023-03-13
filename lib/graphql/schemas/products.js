import {createSchema} from 'graphql-yoga';
import {products, categories, metadata} from '../../deta/connection';
import app from '../../firebase/server';
import {getStorage} from 'firebase-admin/storage';

const bucket = getStorage(app).bucket();
 
//Queries handlers
function getProduct(key) {
  return products.get(key);
}

async function getAllProducts(opts) {
  const {items} = await products.fetch({}, opts);

  return items;
}

async function getProductsByCategory(category, opts) {
  delete opts.category;

  const {items} = await products.fetch({category}, opts);

  return items;
}

//Mutations
async function createProduct(data) {
  try {
    await Promise.all([
      categories.update({products: categories.util.increment(1)}, data.category),
      metadata.update({products: metadata.util.increment(1)}, 'ferre')
    ]);
  } catch(err) {
    throw err;
  }

  return products.put(data);
}

async function updateProduct(key, data) {
  delete data.key;

  const {category} = await products.get(key);

  if (data.category !== category && data.category) {
    const [prevCategory, actualCategory] = await Promise.all([
      categories.get(category),
      categories.get(data.category)
    ]);

    let updatePromises = [];

    if (prevCategory)
      updatePromises.push(
        categories.update({
          products: categories.util.increment(-1)
        }, category)
      );

    if (actualCategory)
      updatePromises.push(
        categories.update({
          products: categories.util.increment(1)
        }, data.category)
      );

    await Promise.all(updatePromises);
  }

  return products.update(data, key);
}

async function deleteProduct(key) {
  const {category} = await products.get(key);

  if (await categories.get(category))
    await categories.update({
      products: categories.util.increment(-1)
    }, category);

  await Promise.allSettled([
    metadata.update({products: metadata.util.increment(-1)}, 'ferre'),
    products.delete(key),
    bucket.file(`products/${key}.webp`).delete()
  ]);

  return key;
}


export default createSchema({
  typeDefs: /* GraphQL */ `
    type Product {
      key: String!
      name: String
      description: String
      category: String
      photo: String
      price: Int
    }

    type Query {
      products(last: String, limit: Int): [Product!]
      product(key: String!): Product
      productsByCategory(category: String!, limit: Int, last: String): [Product]
    }

    type Mutation {
      createProduct(
        name: String!,
        description: String!,
        category: String!,
        photo: String,
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
      products: async (_, _args) => {
        const a = await getAllProducts(_args);

        return a;
      },
      product: async (_, _args) => {
        const {key} = _args;

        return await getProduct(key);
      },
      productsByCategory: async (_, _args) => {
        const {category} = _args;

        return await getProductsByCategory(category, _args);
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
