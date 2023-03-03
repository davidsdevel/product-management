import request from 'supertest';
import gql from '../../pages/api/graphql/categories';
import {categories} from '../../lib/deta/connection';
import getFieldsFromData from '../getFieldsFromData';

const idArray = [];
let testingDataId = null;

function createQuery(query) {
  return request(gql)
    .post('/api/graphql/categories')
    .set('content-type', 'application/json')
    .send({
      query: query
    });
}

beforeAll(async () => {
  const {key} = await categories.put({
    name: 'Category Name',
    image: 'Image URL'
  });

  idArray.push(key);

  testingDataId = key;
});

describe('Categories Testing', () => {
  test('Get All Categories', async () => {
    const response = await createQuery(`query {
      categories {
        key,
        name,
        image
      }
    }`);
    
    const {data} = response.body;

    const {
      image: images,
      name: names,
      key: keys
    } = getFieldsFromData(data.categories);

    expect(response.headers["content-type"])
      .toMatch(/json/);

    expect(response.status)
      .toEqual(200);

    expect(images)
      .toContain('Image URL');
    
    expect(names)
      .toContain('Category Name');
    
    expect(keys)
      .toContain(testingDataId);
  });

  test('Get Single Category', async () => {
    const response = await createQuery(`query {
      category(key: "${testingDataId}") {
        key,
        name,
        image
      }
    }`);

    const {data} = response.body;

    expect(response.headers["content-type"])
      .toMatch(/json/);
    
    expect(response.status)
      .toEqual(200);
    
    expect(data).toEqual({
      category: {
        key: testingDataId,
        name: 'Category Name',
        image: 'Image URL'
      }
    });
  });

  test('Create Category', async () => {
    const response = await createQuery(`mutation {
      createCategory(name: "Testing Name", image: "Testing Image") {
        key,
        name,
        image
      }
    }`);

    const {data: {createCategory}} = response.body;
    
    const data = await categories.get(createCategory.key);
    
    idArray.push(createCategory.key);

    expect(response.headers["content-type"])
      .toMatch(/json/);
    
    expect(response.status)
      .toEqual(200);

    expect(createCategory).toEqual({
      key: createCategory.key,
      name: 'Testing Name',
      image: 'Testing Image'
    });

    expect(data).toEqual({
      key: createCategory.key,
      name: 'Testing Name',
      image: 'Testing Image'
    });
  });

  test('Update Category', async () => {
    const {key} = await categories.put({
      name: 'Update test name',
      image: 'Update test image'
    });

    idArray.push(key);

    const response = await createQuery(`mutation {
      updateCategory(key: "${key}", name: "Mod Name", image: "Mod Image")
    }`);

    const data = await categories.get(key);
    
    const {data: {updateCategory}} = response.body;

    expect(response.status)
      .toEqual(200);

    expect(updateCategory)
      .toBe(key);
    
    expect(data).toEqual({
      key,
      name: 'Mod Name',
      image: 'Mod Image'
    });
  });

  test('Delete Category', async () => {
    const {key} = await categories.put({
      name: 'Delete test name',
      image: 'Delete test image'
    });
    
    idArray.push(key);

    const response = await createQuery(`mutation {
      deleteCategory(key: "${key}")
    }`);

    const data = await categories.fetch();
    
    const {data: {deleteCategory}} = response.body;
    
    const {
      image: images,
      name: names,
      key: keys
    } = getFieldsFromData(data.items);

    expect(response.status)
      .toEqual(200);

    expect(deleteCategory)
      .toBe(key);

    expect(images).not
      .toContain('Delete test image');
    
    expect(names).not
      .toContain('Delete test name');
    
    expect(keys).not
      .toContain(key);

  });
});

afterAll(async () => {
  await Promise.all(idArray.map(e => categories.delete(e)));
})