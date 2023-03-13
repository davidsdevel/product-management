import {createSchema} from 'graphql-yoga';
import {categories, products} from '../../deta/connection';
 
//Queries handlers
function getCategory(key) {
  return categories.get(key);
}

async function getAllCategories() {
  const {items} = await categories.fetch();

  return items;
}

async function getCategoryByName(name) {
  const {items} = await categories.fetch();

  const filtered = items.filter(e => e.name === name);

  return filtered[0] || null;
}

//Mutations
function createCategory(data) {
  return categories.put({
    ...data,
    products: 0
  }, data.name);
}

function updateCategory(key, data) {
  delete data.key;

  return categories.update(data, key);
}

async function deleteCategory(key) {
  const {name} = await categories.get(key);

  const {items} = await products.fetch({category: name});

  await Promise.all(items.map(e => products.update({category: 'Ninguna'}, e.key)));

  await categories.delete(key);

  return key;
}

export default createSchema({
  typeDefs: /* GraphQL */ `
    type Category {
      key: String!
      name: String!
      image: String!
      products: Int!
    }

    type Query {
      categories: [Category!]
      category(key: String!): Category
      categoryByName(name: String!): Category
    }

    type Mutation {
      createCategory(name: String!, image: String!): Category
      updateCategory(key:String!, name: String, image: String): String
      deleteCategory(key: String!): String
    }
  `,
  resolvers: {
    Query: {
      categories: async (_, _args, context) => {
        const categoryList = await getAllCategories();

        return categoryList;
      },
      category: async (_, _args) => {
        const {key} = _args;

        return await getCategory(key);
      },
      categoryByName: async (_, _args) => {
        const {name} = _args;

        return await getCategoryByName(name);

      }
    },
    Mutation: {
      createCategory: async (_, _args) => {
        return await createCategory(_args);
      },
      updateCategory: async (_, _args, context) => {
        const {key, name, image} = _args;

        await updateCategory(key, _args);

        return key;
      },
      deleteCategory: async (_, _args, context) => {
        const {key} = _args;

        return await deleteCategory(key);
      }
    }
  }
});
