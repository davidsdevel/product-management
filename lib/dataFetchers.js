
const categoryDefaults = ['name', 'image'];
const productDefaults = ['name', 'description', 'photo', 'category', 'price'];

const isDev = process.env.NODE_ENV !== 'production';
const vercelUrl = `http${isDev ? '' : 's'}://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

//Helpers
function getFields(fieldsArray) {
  if (fieldsArray.length === 0)
    return ['key'];

  fieldsArray.push('key');
  const filteredDuplicates = Array.from(new Set(fieldsArray));

  return filteredDuplicates.join(',');
}

function parseCategory(category) {
  category.path = category.name.toLowerCase().replace(/\s+/g, '-');

  return category;
}

function parseMutationData(objectData) {
  const parsed = [];

  Object.entries(objectData).forEach(([name, value]) => {
    const isNumber = typeof value === 'number';

    parsed.push(`${name}: ${isNumber ? value : `"${value}"`}`);
  });

  return parsed.join(', ');
}


//Fetch Helpers
async function createBaseFetch(path, query) {
  const response = await fetch(path, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({query})
  });

  if (!response.ok)
    return Promise.reject(await response.text());

  const {data, errors} = await response.json();

  if (errors)
    return Promise.reject(errors);

  return data;
}

function createCategoryFetch(query) {
  return createBaseFetch(`${vercelUrl}/api/graphql/categories`, query);
}

function createProductFetch(query) {
  return createBaseFetch(`${vercelUrl}/api/graphql/products`, query);
}


//Category Queries
export async function getCategory(key, opts = {}) {
  const {fields = categoryDefaults} = opts;

  const parsedFields = getFields(fields);

  const {category} = await createCategoryFetch(`query {
    category(key: "${key}") {${parsedFields}}
  }`);

  return {
    data: category ? parseCategory(category) : null
  };
}

export async function getCategoryByName(name, opts = {}) {
  const {fields = categoryDefaults} = opts;

  const parsedFields = getFields(fields);

  const {categoryByName} = await createCategoryFetch(`query {
    categoryByName(name: "${name}") {${parsedFields}}
  }`);

  return {
    data: categoryByName ? parseCategory(categoryByName) : null
  };
}

export async function getAllCategories(opts = {}) {
  const {fields = categoryDefaults} = opts;
  const parsedFields = getFields(fields);

  const {categories} = await createCategoryFetch(`query {
    categories {${parsedFields}}
  }`);

  return {
    data: categories.map(parseCategory)
  };
}

//Product Queries
export async function getAllProducts(opts = {}) {
  const {
    fields = productDefaults,
    limit = 10
  } = opts;

  const parsedFields = getFields(fields);

  const optionsArray = [];

  if (opts.last)
    optionsArray.push(`last: "${opts.last}"`);

  if (opts.limit)
    optionsArray.push(`limit: ${opts.limit + 1}`);

  const {products} = await createProductFetch(`query {
    products${optionsArray.length > 0 ? `(${optionsArray.join(', ')})` : ''} {${parsedFields}}
  }`);

  const paging = {};

  const hasNext = products.length > opts.limit;

  if (hasNext) {
    products.pop();

    paging.next = products[opts.limit - 1].key;
  }

  return {
    data: products,
    paging
  };

}

export async function getProduct(key, opts = {}) {
  const {fields = productDefaults} = opts;
  const parsedFields = getFields(fields);

  const {product} = await createProductFetch(`query {
    product(key: "${key}") {${parsedFields}}
  }`);

  return {
    data: product
  };
}

export async function getProductsByCategory(category, opts = {}) {
  const {
    fields = productDefaults,
    limit = 10
  } = opts;

  const optionsArray = [];

  if (opts.last)
    optionsArray.push(`last: "${opts.last}"`);

  if (opts.limit)
    optionsArray.push(`limit: ${opts.limit + 1}`);

  const parsedFields = getFields(fields);

  const {productsByCategory} = await createProductFetch(`query {
    productsByCategory(category: "${category}"${optionsArray.length > 0 ? ', ' + optionsArray.join(', ') : ''}) {${parsedFields}}
  }`);

  const paging = {};

  const hasNext = productsByCategory.length > opts.limit;

  if (hasNext) {
    productsByCategory.pop();

    paging.next = productsByCategory[opts.limit - 1].key;
  }

  return {
    data: productsByCategory,
    paging
  };
}



//Category Mutations
export async function createCategory(data) {
  const dataString = parseMutationData(data);

  const {createCategory} = await createCategoryFetch(`mutation {
    createCategory(${dataString}) {
      key,
      name,
      image
    }
  }`);

  return createCategory;
}

export async function updateCategory(key, data) {
  const dataString = parseMutationData(data);

  const {updateCategory} = await createCategoryFetch(`mutation {
    updateCategory(key: "${key}", ${dataString})
  }`);

  return updateCategory;
}

export async function deleteCategory(key) {
  const {deleteCategory} = await createCategoryFetch(`mutation {
    deleteCategory(key: "${key}")
  }`);

  return deleteCategory;
}

//Product Mutations
export async function createProduct(data) {
  const dataString = parseMutationData(data);

  const {createProduct} = await createProductFetch(`mutation {
    createProduct(${dataString}) {
      key,
      name,
      description,
      category,
      photo,
      price
    }
  }`);

  return createProduct;
}

export async function updateProduct(key, data) {
  const dataString = parseMutationData(data);

  const {updateProduct} = await createProductFetch(`mutation {
    updateProduct(key: "${key}", ${dataString})
  }`);

  return updateProduct;
}

export async function deleteProduct(key) {
  const {deleteProduct} = await createProductFetch(`mutation {
    deleteProduct(key: "${key}")
  }`);

  return deleteProduct;
}
