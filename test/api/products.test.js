import request from 'supertest';
import gql from '../../pages/api/graphql/products';
import {products} from '../../lib/deta/connection';
import getFieldsFromData from '../getFieldsFromData';

const idArray = [];
let testingDataId = null;

function createQuery(query) {
  return request(gql)
    .post('/api/graphql/products')
    .set('content-type', 'application/json')
    .send({
      query: query
    });
}

beforeAll(async () => {
  const {key} = await products.put({
    name: 'Product Name',
    description: 'Product Description',
    category: 'Product Category',
    photo: 'Product Photo',
    price: 1999
  });

  idArray.push(key);

  testingDataId = key;
});

describe('Products Testing', () => {
  test('Get All Products', async () => {
    const response = await createQuery(`query {
      products {
        key,
        name,
        description,
        category,
        photo,
        price
      }
    }`);
    
    const {data} = response.body;

    const {
      key: keys,
      name: names,
      description: descriptions,
      category: categories,
      photo: photos,
      price: prices
    } = getFieldsFromData(data.products)

    expect(response.headers["content-type"])
    .toMatch(/json/);
    
    expect(response.status)
      .toEqual(200);

    expect(names)
      .toContain('Product Name');

    expect(descriptions)
      .toContain('Product Description');

    expect(categories)
      .toContain('Product Category');

    expect(photos)
      .toContain('Product Photo');

    expect(prices)
      .toContain(1999);

    expect(keys)
      .toContain(testingDataId);
  });

  test('Get Single Products', async () => {
    const response = await createQuery(`query {
      product(key: "${testingDataId}") {
        key,
        name,
        description,
        category,
        photo,
        price
      }
    }`);

    const {data} = response.body;

    expect(response.headers["content-type"])
      .toMatch(/json/);

    expect(response.status)
      .toEqual(200);

    expect(data).toEqual({
      product: {
        key: testingDataId,
        name: 'Product Name',
        description: 'Product Description',
        category: 'Product Category',
        photo: 'Product Photo',
        price: 1999
      }
    });
  });

  test('Get Products by Category', async () => {
    const response = await createQuery(`query {
      productsByCategory(category: "Product Category") {
        key,
        name,
        description,
        category,
        photo,
        price
      }
    }`);


    const {data} = response.body;

    const {
      key: keys,
      name: names,
      description: descriptions,
      category: categories,
      photo: photos,
      price: prices
    } = getFieldsFromData(data.productsByCategory);

    expect(response.headers["content-type"])
      .toMatch(/json/);

    expect(response.status)
      .toEqual(200);

    expect(response.headers["content-type"])
      .toMatch(/json/);
    
    expect(response.status)
      .toEqual(200);

    expect(data.productsByCategory.length)
      .toEqual(1); //Check Array length to match with elements with these categories

    expect(names)
      .toContain('Product Name');

    expect(descriptions)
      .toContain('Product Description');

    expect(categories)
      .toContain('Product Category');

    expect(photos)
      .toContain('Product Photo');

    expect(prices)
      .toContain(1999);

    expect(keys)
      .toContain(testingDataId);
  });


  test('Create Products', async () => {
    const testData = {
      name: 'Create Name',
      description: 'Create Description',
      category: 'Create Category',
      photo: 'Create Photo',
      price: 1998
    };

    const response = await createQuery(`mutation {
      createProduct(
        name: "${testData.name}", 
        description: "${testData.description}",
        category: "${testData.category}",
        photo: "${testData.photo}"
        price: ${testData.price}
      ) {
        key,
        name,
        description,
        category,
        photo,
        price
      }
    }`);

    const {data: {createProduct}} = response.body;
    const data = await products.get(createProduct.key);
    
    idArray.push(createProduct.key);

    expect(response.headers["content-type"])
      .toMatch(/json/);
      expect(response.status)
      .toEqual(200);

    expect(createProduct).toEqual({
      key: createProduct.key,
      ...testData
    });

    expect(data).toEqual({
      key: createProduct.key,
      ...testData
    });
  });


  test('Update Products', async () => {
    const {key} = await products.put({
      name: 'Update Name',
      description: 'Update Description',
      category: 'Update Category',
      photo: 'Update Photo',
      price: 1998
    });

    const response = await createQuery(`mutation {
      updateProduct(
        key: "${key}",
        name: "Mod Name", 
        description: "Mod Description",
        category: "Mod Category",
        photo: "Mod Photo"
        price: 1818
      )
    }`);

    const {data: {updateProduct}} = response.body;
    const data = await products.get(key);
    
    idArray.push(key);

    expect(response.status)
      .toEqual(200);

    expect(updateProduct)
      .toBe(key);
    
    expect(data).toEqual({
      key,
      name: 'Mod Name', 
      description: 'Mod Description',
      category: 'Mod Category',
      photo: 'Mod Photo',
      price: 1818
    });
  });

  test('Delete Products', async () => {
    const {key} = await products.put({
      name: 'Delete Name',
      description: 'Delete Description',
      category: 'Delete Category',
      photo: 'Delete Photo',
      price: 1990
    });

    const response = await createQuery(`mutation {
      deleteProduct(key: "${key}")
    }`);

    const {data: {deleteProduct}} = response.body;
    const data = await products.fetch();
    
    idArray.push(key);

    const {
      key: keys,
      name: names,
      description: descriptions,
      category: categories,
      photo: photos,
      price: prices
    } = getFieldsFromData(data.items)

    expect(response.status)
      .toEqual(200);
    
    expect(deleteProduct)
      .toBe(key);

    expect(names).not
      .toContain('Delete Name');

    expect(descriptions).not
      .toContain('Delete Description');

    expect(categories).not
      .toContain('Delete Category');

    expect(photos).not
      .toContain('Delete Photo');

    expect(prices).not
      .toContain(1990);

    expect(keys).not
      .toContain(key);

  });
});

afterAll(async () => {
  await Promise.all(idArray.map(e => products.delete(e)));
});
