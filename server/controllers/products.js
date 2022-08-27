import Products from '../models/products.js';

export const getAllProductsStatic = async (req, resp) => {
  const search = 'ab';
  const products = await Products.find({
    name: { $regex: search, $options: 'i' },
  });
  resp.status(200).json({ products, nbHits: products.length });
};

export const getAllProducts = async (req, resp) => {
  const { featured, company, name } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }

  console.log(queryObj)
  const products = await Products.find(queryObj);
  resp.status(200).json({ products, nbHits: products.length });
};

