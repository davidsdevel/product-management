import * as DetaOrm from 'deta-base-orm';

let Category = null;

if (!Category) {

  const CategorySchema = new DetaOrm.Schema({
    name: 'string',
    image: 'string'
  });

  const Category = new DetaOrm.Base('Category', CategorySchema);
}

export default Category;
