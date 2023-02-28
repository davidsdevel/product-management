import { Deta } from 'deta'; // import Deta

let productsTable = null;
let categoriesTable = null;

if (!productsTable || ! categoriesTable) {
  const deta = Deta(process.env.DETA_KEY);

  if (!productsTable)
    productsTable = deta.Base('products');
  
  if (!categoriesTable)
    categoriesTable = deta.Base('categories');
}

export const products = productsTable;
export const categories = categoriesTable;
