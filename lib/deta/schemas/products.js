import * as DetaOrm from 'deta-base-orm';

let Product = null;

if (!Product) {

  const ProductSchema = new DetaOrm.Schema({
    name: 'string',
    description: 'string',
    category: 'string',
    photo: 'string',
    price: 'number',
  });

  const Product = new DetaOrm.Base('Product', ProductSchema);
}

export default Product;
