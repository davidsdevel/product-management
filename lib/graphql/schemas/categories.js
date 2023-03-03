import {createSchema} from 'graphql-yoga';
import {categories} from '../../deta/connection';
 
//Queries handlers
function getCategory(key) {
  return categories.get(key);
}

async function getAllCategories() {
  const {items} = await categories.fetch();

  return items;
}

//Mutations
function createCategory(data) {
  return categories.put(data);
}

function updateCategory(key, data) {
  delete data.key;

  return categories.update(data, key);
}

async function deleteCategory(key) {
  await categories.delete(key);

  return key;
}

export default createSchema({
  typeDefs: /* GraphQL */ `
    type Category {
      key: String!
      name: String!
      image: String!
    }

    type Query {
      categories: [Category!]
      category(key: String!): Category
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
