import { Deta } from 'deta'; // import Deta

const isDev = process.env.NODE_ENV !== 'production';
const detaKey = process.env.DETA_KEY;

let productsTable = null;
let categoriesTable = null;
let metaDataTable = null;

if (!productsTable || ! categoriesTable || !metaDataTable) {
  const deta = Deta(detaKey);

  if (!productsTable)
    productsTable = deta.Base(isDev ? 'products_dev' : 'products');
  
  if (!categoriesTable)
    categoriesTable = deta.Base(isDev ? 'categories_dev' : 'categories');

  if (!metaDataTable)
    metaDataTable = deta.Base(isDev ? 'metadata_dev' : 'metadata');
}

export const products = productsTable;
export const categories = categoriesTable;
export const metadata = metaDataTable;
